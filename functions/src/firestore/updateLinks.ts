import * as functions from "firebase-functions";

const updateLinks = functions.firestore
  .document("resources/links")
  .onUpdate(async (change: any, context) => {
    console.log("function ran");

    // retrieve the previous and current value
    const before = change.before.data();
    const after = change.after.data();

    // only update if name has changed to prevent infinite loops
    if (before.name === after.name) {
      return null;
    }

    // get open graph data
    const og = require("open-graph");
    const data = before.url !== null ? await og(before.url) : null;

    // set the data in docs
    return change.after.ref.update({
      title: after.title == null ? data?.title : after.title,
      description:
        after.description == null ? data?.description : after.description,
      imageURL: after.imageURL == null ? data?.image.url : after.imageURL,
      url: after.url == null ? data?.url : after.url,
    });
  });

export default updateLinks;
