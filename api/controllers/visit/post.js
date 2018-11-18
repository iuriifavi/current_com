module.exports = {
  sync: true,
  friendlyName: "Visit /post",
  description: "Register visit's points from a customer",

  inputs: {
    userId: {
      friendlyName: "userId",
      description: "userId",
      type: "string",
      required: true
    },
    name: {
      friendlyName: "Merchant name",
      description: "Merchant POI name based on geo services",
      type: "string",
      required: true
    }
  },
  exits: {
    success: {
      outputFriendlyName: "Recent user visitId",
      outputDescription: "ID that specify last user POI visited"
    }
  },

  fn: function post(inputs, exits) {
    // user id are valid for sure ;)
    // should send ok ASAP coz we are weebhook :)
    
    let visitId = sails.helpers.sequence();

    let newRecord = { userId: inputs.userId, name: inputs.name, visitId: visitId };

    Visit.create(newRecord)
      .fetch()
      .then(visit => sails.log.debug(visit));

    return exits.success({ visitId: visitId });
  },

  fnSynchronized: async function post(inputs, exits) {

    let visitId = sails.helpers.sequence();

    let newRecord = { userId: inputs.userId, name: inputs.name, visitId: visitId };

    let visit = await Visit.create(newRecord)
      .fetch();

    return exits.success({ visitId: visit.visitId });
  }
};
