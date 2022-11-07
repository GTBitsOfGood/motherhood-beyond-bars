import * as functions from "firebase-functions";
import og from "fetch-opengraph";

const updateLinks = functions.firestore
  .document("resources/links")
  .onUpdate(async (change: any, context) => {
    console.log("function ran");

    // retrieve the previous and current value
    const before = change.before.data();
    const after = change.after.data();

    const changed = after.links.filter((link: any) => {
      if (before.links.find((l: any) => l.url !== link.url)) {
        return true;
      }
      return false;
    });
    
    // only update if name has changed to prevent infinite loops
    if (changed.length === 0) return null;

    // get open graph data
    const promises = changed.map((link: any) => {
      // TODO: validate the URL
      return og.fetch(link.url);
    })

    const data = await Promise.all(promises);

    // update the database
    data.forEach((ogData: any) => {
      const index = after.links.findIndex((l: any) => l.url === ogData.url);
      console.log(ogData);
      after.links[index] = {
        ...after.links[index],
        title: ogData.title,
        description: ogData.description,
        image: ogData.image,
      }
    });

    return change.after.ref.set(after);

    // const data = before.url !== null ? await og(before.url) : null;

    // // set the data in docs
    // return change.after.ref.update({
    //   title: after.title == null ? data?.title : after.title,
    //   description:
    //     after.description == null ? data?.description : after.description,
    //   imageURL: after.imageURL == null ? data?.image.url : after.imageURL,
    //   url: after.url == null ? data?.url : after.url,
    // });
  });

export default updateLinks;
