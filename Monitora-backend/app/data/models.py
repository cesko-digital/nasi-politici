from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.exc import SQLAlchemyError

db = SQLAlchemy()
Base = declarative_base()


class CRUD():
    def add(self, resource):
        db.session.add(resource)
        return db.session.commit()

    def update(self):
        return db.session.commit()

    def delete(self, resource):
        db.session.delete(resource)
        return db.session.commit()


class CalculatedPlayers(db.Model, CRUD):
    id = db.Column(db.Integer,  primary_key=True)
    instatid = db.Column(db.Integer)
    name = db.Column(db.String(255))
    nationality = db.Column(db.String(255))
    team = db.Column(db.String(255))
    team_id = db.Column(db.Integer)
    league = db.Column(db.String(255))
    league_id = db.Column(db.Integer)
    birthday = db.Column(db.String(255))


