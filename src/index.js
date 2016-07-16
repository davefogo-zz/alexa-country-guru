/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Country Guru for a country fact"
 *  Alexa: "Here's your country fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[arn:aws:lambda:us-east-1:865873523851:function:myFactSkill]";

/**
 * Array containing country facts.
 */
var FACTS = [
    "China is the most populous country with 1.37 billion people.",
    "The second most populous country is India with 1.31 billion people.",
    "The United States is the third most populous country with 321 million people.",
    "The least populous country is Cocos (Keeling) Islands with just 596 people.",
    "The Vatican City has a population of about 1000 people.",
    "Monaco has a GDP per capita of 163353 US Dollars making it the highest in the world.",
    "Burundi has a GDP per capita of 275.98 US dollars and is the lowest in the world.",
    "Qatar has the lowest unemployment rate. It's only 0.3 percent. This means that out of 2.24 million people that live there, only 6720 people are jobless.",
    "Mauritania has the highest unemployment rate. It's 31 percent. This means that out of 4.07 million people that live there, 1261700 people are jobless.",
    "In Iceland about 98 out of 100 people are internet users.",
    "In America Samoa, North Korea and Northern Mariana Islands, 0 out of 100 people are internet users.",
    "South Korea has the world's fastest internet connection at 26.7 megabits per second.",
    "Lybia is the country with the slowest internet connection at 0.5 megabits per second.",
    "Russia is the largest country at 17075200 square kilometers or 6592735 square miles.",
    "The second largest country is Canada with 9826630 square kilometers or 3855081 square miles.",
    "The United States is the third largest country with 9826630 square kilometers or 3718691 square miles.",
    "The Vatican City is the smallest country with 0.44 square kilometers or 0.17 square miles.",
    "The United States does not have a national official language. However, English is the primary language used in government bodies.",
    "Canada has two national official languages. English and French.",
    "The country with the most national official languages is Zimbabwe with 16.",
    "Finland is the country with the most islands with over 100000.",
    "There are 44 landlocked countries in the world. This means the country is completely surrounded by land.",
    "There are 196 countries in the world.",
    "The country with the most populous city/urban area is Japan. Tokyo/Yokohama has a population of 33200000.",
    "The United States has the second most populous city/urban area. The New York Metro has a population of 17800000."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * CountryGuru is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a country fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random country fact from the country facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your fact: " + randomFact;
    var cardTitle = "Your Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the CountryGuru skill.
    var fact = new Fact();
    fact.execute(event, context);
};
