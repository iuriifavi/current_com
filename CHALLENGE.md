Challenge:
Using any technologies you choose, to design and host a simple API that accepts user location webhooks and can be queried with a search string or a visit ID.

Context:
Current uses a location service provider to help match where a user is when they use their Current card. This reduces fraud and leads to a more more intelligent receipt. This is implemented by being notified whenever a user enters a venue, and then when the card is used, matching the merchant string we receive from Visa with a recently entered venue.

Requirements:
This API must be available on a public endpoint you control
This API must expose the following two endpoints
POST /visit
Accepts POST requests with ‘application/json’ types
The schema for submitted objects is as follows:
userId - the user that is submitting the location
name - the name of the location   
Returns a visitId which can be referenced in the GET. Visit IDs are globally unique to the location submission
GET /visit
Can be queried with either of the following patterns:
visitId 
both of the following two query params: 
userId
searchString- A string which is attempted to be matched over the 5 most recent locations the user has visited. The matching should be fuzzy, and case insensitive
Returns an array of arrival objects that was submitted to the POST

Delivery:
Once you complete the API, please email Alex with the public endpoint and a link to a github repository of the code. Trevor will test the endpoint after submission and report the results.

Example timeline:
POST { 'userId': "user1", name: "McDonald’s" }
Returns: { visitId: "some-visit-id-1" }

GET /visit?visitId=some-visit-id-1
Returns: [{ userId: "user1", name: "McDonald’s", visitId: "some-visit-id-1" }]

POST { userId: "user1", name: "Starbucks" }
Returns: { visitId: "some-visit-id-2" }
GET /visit?userId=user1&searchString=MCDONALD’S LAS VEGAS
Returns: [{ userId: "user1", name: "McDonald’s", visitId: "some-visit-id-1" }]

POST { userId: "user2", name: "Starbucks" }
Returns: { visitId: "some-visit-id-3" } 

GET /visit?userId=user2&searchString=APPLE
Returns: []

Has been using Node.JS as primary language for the past 2 years in conjunction with react, angular

API’s has been building for backend of websites - adding users to database.