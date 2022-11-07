import * as functions from "firebase-functions";
import og from "fetch-opengraph";

const updateLinks = functions.firestore
  .document("resources/links")
  .onUpdate(async (change: any, context) => {

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
      return og.fetch(link.url).catch((err: any) => {
        return false;
      });
    })

    const data = await Promise.all(promises);

    // update the database
    data.forEach((ogData: any) => {
      if (!ogData) return;
      const index = after.links.findIndex((l: any) => l.url === ogData.url);
      console.log(ogData);
      after.links[index] = {
        ...after.links[index],
        title: after.links[index].title || ogData.title,
        description: after.links[index].description || ogData.description,
        image: ogData.image,
      }
    });

    return change.after.ref.set(after);
  });

export default updateLinks;
