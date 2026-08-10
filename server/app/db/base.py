from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

from app.models.profile import Profile
from app.models.skill import Skill
from app.models.experience import Experience
from app.models.project import Project
from app.models.post import Post
from app.models.contact import Contact
from app.models.certificate import Certificate
from app.models.learning import Learning
