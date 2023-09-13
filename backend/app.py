from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv  
from flask_cors import CORS 
import os

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")  


DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")

app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}'

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
    
    todos = Todo.query.all()

    if len(todos) > 0:
        serialized_todos = [{
            'id': todo.id,
            'title': todo.title,
            'description': todo.description,
            'completed': todo.completed
        } for todo in todos]

        return jsonify(serialized_todos)
    else:
        return jsonify({"message": "No todos found"})



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

@app.route('/edit/<int:id>', methods=['PUT'])
def editTodo(id):
    todo = Todo.query.get(id)

    if not todo:
        return jsonify({'error': 'Todo not found'}), 404

    data = request.get_json()

    if 'title' in data:
        todo.title = data['title']
    if 'description' in data:
        todo.description = data['description']
    if 'completed' in data:
        todo.completed = data['completed']

    db.session.commit()

    return jsonify({'message': 'Todo edited successfully!'})

@app.route('/delete/<int:id>', methods=['DELETE'])
def deleteTodo(id):
    todo = Todo.query.get(id)
    if not todo:
        return jsonify({'error': 'Todo not found'}), 404

    db.session.delete(todo)
    db.session.commit()

    return jsonify({'message': 'Todo deleted successfully!'}, 200)

if __name__ == "__main__":
    app.run(debug=True)
