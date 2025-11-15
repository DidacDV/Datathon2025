from flask import Blueprint, render_template, jsonify, request
from . import db
from .models import User
main = Blueprint('main', __name__)

@main.route("/")
def home():
    return render_template("index.html")

@main.route("/api/hello")
def api_hello():
    return jsonify({"message": "Hello from Flask backend!"})

@main.route('/api/add_user', methods=['POST'])
def add_user():
    data = request.json
    if not data or 'name' not in data or 'revenue' not in data:
        return jsonify({'error': 'Missing name or revenue'}), 400

    user = User(user_name=data['name'], revenue=data['revenue'])
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': f'User {user.user_name} added successfully!', 'id': user.id})

@main.route('/api/revenue/<string:user_name>')
def get_revenue(user_name):
    print(user_name)
    user = User.query.filter_by(user_name=user_name).first()
    print(user)
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "id": user.id,
        "name": user.user_name,
        "revenue": user.revenue
    })