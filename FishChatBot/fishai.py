from langchain_community.utilities import SQLDatabase
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import os
import re

load_dotenv()
sql_uri = f"mysql+mysqlconnector://{os.getenv('DBUSER')}:{os.getenv('DBPASS')}@{os.getenv('DBHOST')}:{os.getenv('DBPORT')}/{os.getenv('DBSCHEMA')}"

def get_schema(_):
    db = SQLDatabase.from_uri(sql_uri)
    return db.get_table_info(table_names=["freshwater_fish"])

def extract_query(query):
    sql_code_match = re.search(r"```(my)?sql(.*?)```", query, re.DOTALL)
    if sql_code_match:
        sql_code = sql_code_match.group(2).strip()
    else:
        sql_code = query
    print(query)
    return sql_code

def get_fish_qna_sql_agent():
    sql_template = """
    Based on the table schema below, write a MySQL query that would answer the user's question. 
    Return only the query without any explanation:
    {schema}
    
    Question: {question}
    SQL Query:
    """
    sql_prompt = ChatPromptTemplate.from_template(sql_template)

    llm = ChatOpenAI(model="gpt-4-turbo", temperature=1)
    sql_chain = (
        RunnablePassthrough.assign(schema = get_schema)
        | sql_prompt
        | llm.bind(stop="\nSQL Result:")
        | StrOutputParser()
    )
    return sql_chain

def run_query(query):
    db = SQLDatabase.from_uri(sql_uri)
    return db.run(query)

def fish_qna_agent(question: str):
    qna_template = """
    Based on the schema below, question, and MySQL response, write a natural language response containing only the necessary details:
    {schema}

    Question: {question}
    SQL Response: {response}
    """
    llm = ChatOpenAI(model="gpt-4o-mini", temperature=1)
    qna_prompt = ChatPromptTemplate.from_template(qna_template)
    sql_chain = get_fish_qna_sql_agent()
    qna_chain = (
        RunnablePassthrough.assign(query = sql_chain).assign(
            schema = get_schema,
            response = lambda variables: run_query(extract_query(variables["query"]))
        )
        | qna_prompt
        | llm
        | StrOutputParser()
    )
    response = qna_chain.invoke({"question": question})
    return response






    

