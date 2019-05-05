from oauth2client.client import GoogleCredentials
from googleapiclient import discovery
from flask import escape
import json

ml = discovery.build('ml', 'v1')
name = 'projects/{}/models/{}'.format('your-gcp-project-name', 'your-ai-platform-model-name')

def predict(request):
    request_json = request.get_json()
    print(request_json)
    question = ''

    if request_json and 'question' in request_json:
        question = request_json['question']

    label_arr = ['keras','matplotlib','pandas','scikitlearn','tensorflow']

    response = ml.projects().predict(
        name=name,
        body={'instances': [question]}
    ).execute()

    return_str = ''
    tags = []

    if 'error' in response:
        return_str = response['error']
        raise RuntimeError(response['error'])
    else:
        probabilities = response['predictions'][0]
        for i,val in enumerate(probabilities):
            print(i,val)
            if val > 0.8:
                tags.append(label_arr[i])
        return_str = ','.join(tags)
        if len(return_str) == 0:
            return_str = 'No tags found.'
    
    print(return_str)
    return json.dumps({'resp': return_str})
