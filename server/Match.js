module.exports = { 
        calculateSentiment : function(entry) {
        const CognitiveServicesCredentials = require("@azure/ms-rest-js");
        const TextAnalyticsAPIClient = require("@azure/cognitiveservices-textanalytics");

        const subscription_key = '3c37d63167ea4a6e9a7654be8de8cd6b';
        const endpoint = 'https://feelsmatching.cognitiveservices.azure.com/';
    
        const creds = new CognitiveServicesCredentials.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': subscription_key } });
        const client = new TextAnalyticsAPIClient.TextAnalyticsClient(creds, endpoint);

        const inputDocuments = {documents:[
            {language:"en", id:"1", text: entry}
        ]}

        const operation = client.sentiment({multiLanguageBatchInput: inputDocuments})
        
        return operation;
    }
};