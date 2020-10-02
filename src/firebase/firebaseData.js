import {db} from "../firebase/firebase";

export default async (value) => {
    let data;
    await db
        .collection("fl_content")
        .where("_fl_meta_.schema", "==", value)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                data = doc.data();
            });
        });

    return data;
}

