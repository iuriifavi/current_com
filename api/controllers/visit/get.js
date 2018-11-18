const Fuse = require('fuse.js');

var visitFuseOptions = {
  keys: ['name']
};

const stripVisit = (visit) => ({ userId: visit.userId, name: visit.name, visitId: visit.visitId });


module.exports = {
  friendlyName: "Visit /get",
  description: "Retrieve last POI location/s from a customer",

  inputs: {
    userId: {
      friendlyName: "userId",
      description: "userId",
      type: "string"
    },
    searchString: {
      friendlyName: "Merchant name searchString",
      description: "Search string that contain specific merchant name",
      type: "string"
    },
    visitId: {
      friendlyName: "Visit Id",
      description: "Visit Id related to some visit",
      type: "string"
    }
  },

  exits: {
    visitFound: {
      outputFriendlyName: "visit record based on visitId",
      outputDescription: "Returns visit record related for specific 'visitId'"
    },
    matchFound: {
      outputFriendlyName: "visit records based on merchant name",
      outputDescription:
        "Returns visit records founded across last 5 visit's of specific userId and fuzzy match merchant name"
    },
    notFound: {
      responseType: 'notFound',
      outputFriendlyName: "No record's found",
      outputDescription: "Can't found any records that match request"
    },
    invalidArgument: {
      statusCode: 400,
      description: "One or more arguments are invalid"
    }
  },

  fn: async function post(inputs, exits) {
    if (
      inputs.visitId !== undefined &&
      inputs.userId === undefined &&
      inputs.searchString === undefined
    ) {
      let record = await Visit.findOne({ visitId: inputs.visitId });
      if (record) {
        return exits.visitFound(stripVisit(record));
      } else {
        return exits.notFound();
      }
    } else if (
      inputs.visitId === undefined &&
      inputs.userId !== undefined &&
      inputs.searchString !== undefined
    ) {
      let records = await Visit.find({userId: inputs.userId }).sort('createdAt DESC').limit(5);
      
      if (records !== undefined && records.length > 0) {
        let fuse = new Fuse(records, visitFuseOptions);
        records = fuse.search(inputs.searchString);
      }

      if (records !== undefined && records.length > 0) {
        return exits.matchFound(records.map(stripVisit));
      } else {
        return exits.notFound();
      }
    }

    return exits.invalidArgument({ errorMessage: "invalid argument" });
  }
};
