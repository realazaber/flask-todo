from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv  
import os

app = Flask(__name__)

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")

app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}'

# Initialize SQLAlchemy with the Flask app
db = SQLAlchemy(app)

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(256), nullable=False)
    completed = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<Task {self.title}>'   

@app.route('/', methods=['GET'])
def getTodos():
    # Query all todos from the database
    todos = Todo.query.all()

    # Serialize the todos to a list of dictionaries
    serialized_todos = [{
        'id': todo.id,
        'title': todo.title,
        'description': todo.description,
        'completed': todo.completed
    } for todo in todos]

    # Return the serialized todos as JSON response
    return jsonify(serialized_todos)

@app.route('/create', methods=['POST'])
def createTodo():
    data = request.get_json()

    title = data.get('title')
    description = data.get('description')
    completed = data.get('completed')

    new_todo = Todo(title=title, description=description, completed=completed)

    db.session.add(new_todo)
    db.session.commit()

    return jsonify({'message': 'Todo created successfully!'})

@app.route('/edit', methods=['PUT'])
def editTodo():
    return "edit Todo"

@app.route('/delete', methods=['DELETE'])
def deleteTodo():
    return "delete Todo"

if __name__ == "__main__":
    app.run(debug=True)
