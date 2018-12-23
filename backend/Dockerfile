FROM python:latest

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt
RUN [ "python", "-c", "import nltk; nltk.download('punkt')" ]
RUN [ "python", "-c", "import nltk; nltk.download('stopwords')" ]
# Make port 80 available to the world outside this container
EXPOSE 8000

CMD ["gunicorn", "webservice:app", "-b", "0.0.0.0:8000", "--workers=3"]