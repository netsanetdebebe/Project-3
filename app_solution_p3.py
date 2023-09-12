# Import the dependencies.
import datetime as dt
import numpy as np

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
# use config.py to set username and password
from config import username, password
engine_string = "postgresql+psycopg2://" + username + ":" + password + "@localhost:5432/project-3"
engine = create_engine(engine_string)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# Save references to each table
Hospital_Info = Base.classes.hospital_info
Hospital_Locations = Base.classes.hospital_locations

# Create our session (link) from Python to the DB
session = Session(engine)

def hospital_data():
    # need to pull out name, rating, bed count, type, ownership
    sel = [Hospital_Info.hospital_name,  Hospital_Info.overall_rating, Hospital_Info.hospital_type, Hospital_Locations.latitude, Hospital_Locations.longitude, \
           Hospital_Info.ownership, Hospital_Locations.beds, Hospital_Locations.city, Hospital_Locations.state] 
    results = session.query(*sel).all()
    session.close()
    info = list(np.ravel(results))
    #return results 
    return info

#print(hospital_data())

# results = session.query(Hospital_Info.hospital_name).all()
# data = list(np.ravel(results))
# print(data)