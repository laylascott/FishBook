from fishai import fish_qna_agent
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.agents import AgentExecutor, create_openai_functions_agent
from langchain_openai import ChatOpenAI
from langchain_core.tools import Tool

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

tools = [
    Tool(
        name="FishQnA",
        func=fish_qna_agent,  
        description="Useful for answering any questions. Do not modify any question.",
    ),
]

prompt_template = """You are a Chat Bot that is useful for answering only questions related to fish, species of fish and aquarium for fish.
Use the tool for answering the questions, that's where you get the data from.
Do not modify the question. Send it to the tool as is.
Question: {input}
"""

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", prompt_template),
        ("user", "{input}"),
        MessagesPlaceholder(variable_name="agent_scratchpad"),
    ]
)

async def agent_executor(question: str):
    llm = ChatOpenAI(model="gpt-4-turbo", temperature=1)

    agent = create_openai_functions_agent(
        llm=llm,
        tools=tools,
        prompt=prompt
    )

    agent_exec = AgentExecutor(
        agent=agent,
        tools=tools,
    )

    async for chunk in agent_exec.astream({"input": question}):
        if "actions" in chunk:
            for action in chunk["actions"]:
                print(f"Calling Tool: `{action.tool}` with input `{action.tool_input}`")
        # Observation
        elif "steps" in chunk:
            for step in chunk["steps"]:
                    print(f"Tool Result: `{step.observation}`")
        # Final result
        elif "output" in chunk:
            print(f'Final Output: {chunk["output"]}')
            output = chunk["output"]
            return output
        else:
            raise ValueError()
        print("---")

@app.post("/ask")
async def ask_question(request: Request):
    body = await request.json()
    question = body.get("question")
    result = await agent_executor(question)
    return {"answer": result}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
