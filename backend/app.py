from flask import Flask

app = Flask(__name__)

@app.route('/', methods=['GET'])
def getTodos():
    return "Get todos"

@app.route('/create', methods=['POST'])
def createTodo():
    return "create todo"

@app.route('/edit', methods=['PUT'])
def editTodo():
    return "edit Todo"

@app.route('/delete', methods=['DELETE'])
def deleteTodo():
    return "delete Todo"

if __name__ == "__main__":
    app.run(debug=True)