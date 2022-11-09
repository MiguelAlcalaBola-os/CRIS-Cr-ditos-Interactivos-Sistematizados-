import { app } from './firebase'
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";

const storage = getStorage(app)

//--------------------------- Firebase Storage ---------------------------
function uploadIMG(file, fileName, setUserSuccess, postsIMG, setUserPostsIMG) {
    console.log("img")
    const imagesRef = ref(storage, fileName);
    uploadBytes(imagesRef, file).then((snapshot) => {
        setUserSuccess("Cargando")
        getList(postsIMG, setUserPostsIMG)
    }).catch(e => setUserSuccess('error'));
}

let object = {}
function downloadIMG(fileName, postsIMG, setUserPostsIMG) {
    console.log("hello2")

    const imagesRef = ref(storage, `${fileName}`);
    getDownloadURL(imagesRef)
        .then((url) => {
            object = { ...object, [fileName]: url }

            setUserPostsIMG(object)
        })
        .catch((error) => {

        });
}


const listRef = ref(storage, '/');

function getList(postsIMG, setUserPostsIMG) {

    listAll(listRef)
        .then((res) => {
            res.prefixes.forEach((folderRef) => {
                // All the prefixes under listRef.
                // You may call listAll() recursively on them.
            });
            res.items.forEach((itemRef) => {
                console.log("hello4")

                downloadIMG(itemRef._location.path_, postsIMG, setUserPostsIMG)
            });
        }).catch((error) => {
            // Uh-oh, an error occurred!
        });
}




export { uploadIMG, downloadIMG, getList }

