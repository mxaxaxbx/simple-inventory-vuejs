import firebase, { storage } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const db = firebase.firestore();

export default{
    add_product({dispatch}, prod){
        const user_id = JSON.parse(localStorage['userInfo'])['uid'];
        const product = {
            name: prod.name,
            supplier_id: prod.supplier_id,
            categorie_id: prod.categorie_id,
            quantity: prod.quantity,
            salePriceUnit: prod.salePriceUnit,
            netPriceUnit: prod.netPriceUnit,
            barcode: prod.barcode,
            user_id : user_id
        }

        return dispatch('get_product_by_barcode', prod.barcode)
        .then((res) => {
            if(res){alert('Este producto ya se encuentra registrado. Verifique el código de barras'); return null;}
            
            return db.collection('products').add(product)
            .then((res) => {
                return res.id;
            })
            .catch((err) =>{
                alert(err.message);
                return null;
            });
        });
    },

    get_products({commit}){
        const docs = []
        const user_id = JSON.parse(localStorage['userInfo'])['uid']

        db.collection('products')
        .where('user_id', '==', user_id)
        .get().then((res) => {
            res.forEach(doc => {
                docs.push({id:doc.id, data:doc.data()})
            });

            commit('SET_PRODUCTS', docs);
        });        
    },

    get_product({commit}, id){
        const user_id = JSON.parse(localStorage['userInfo'])['uid']

        return db.collection('products').doc(id)
        .get()
        .then((res) => {
            if(res.data() == undefined){return null}
            if(res.data().user_id != user_id){return null}

            commit('SET_PRODUCT', res.data())

            return res.data();
        })
        .catch((err) =>{
            alert(err.message);
            return null;
        });
    },

    get_product_by_barcode({}, barcode){
        const user_id = JSON.parse(localStorage['userInfo'])['uid']

        return db.collection('products')
        .where('user_id', '==', user_id)
        .where('barcode', '==', barcode)
        .get()
        .then((res) => {
            if(res.docs.length == 0){return null;}

            return res.docs[0].id;
        })
        .catch((err) =>{
            alert(err.message);
            return null;
        });
    },

    modify_product({dispatch}, product){
        return dispatch('get_product_by_barcode', product.barcode)
        .then((doc_id) => {
            if(!doc_id){alert('Este producto no se encuentra registrado'); return null;}

            const user_id = JSON.parse(localStorage['userInfo'])['uid'];
            const prod = {
                name: product.name,
                supplier_id: product.supplier_id,
                categorie_id: product.categorie_id,
                quantity: product.quantity,
                salePriceUnit: product.salePriceUnit,
                netPriceUnit: product.netPriceUnit,
                barcode: product.barcode,
                user_id : user_id
            }

            return db.collection('products').doc(doc_id)
            .set(prod)
            .then(() => {
                return true;
            })
            .catch((err) => {
                alert(err.message);
                return null;
            });

        });
    },

    upload_product_image({commit, dispatch}, data){
        dispatch('get_product', data.product_id)
        .then((doc) => {
            if(!doc){alert('El producto no se encuentra registrado'); return null;}

            const storageRef = firebase.storage()
            .ref(`${data.product_id}`)
            .put(data.imageData);

            storageRef.on(`state_changed`, snapshot => {
                commit('SET_UPLOAD_VALUE', (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            }, error => {
                alert('ha ocurrido un error al cargar la imagen.');
            }, () => {
                commit('SET_UPLOAD_VALUE', 100);
                storageRef.snapshot.ref.getDownloadURL().then((url) => {
                    commit('SET_PICTURE', url);
                })
            })

        });
    },

    get_product_image({dispatch, commit}, product_id){
        dispatch('get_product', product_id)
        
        .then((doc) => {
            if(!doc){alert('El producto no se encuentra registrado'); return null;}

            firebase.storage()
            .ref(`${product_id}`)
            .getDownloadURL()
            .then((fileUrl) => {
                commit('SET_PICTURE', fileUrl);
            })
            .catch((err) => {
                commit('SET_PICTURE', null);
            })
        })
    },

    delete_product_image({commit}, id){
        firebase.storage()
        .ref(`${id}`)
        //.child(`${barcode}`)
        .delete()
        .then(() => {
            commit('SET_PICTURE', null);
        })
        .catch((err) => {
            alert(err.message);
        })
    },

    delete_product({dispatch}, id){
        return dispatch('get_product', id)
        .then((doc) => {
            if(!doc){alert('El producto no se encuentra registrado'); return null;}

            dispatch('delete_product_image', id);

            return db.collection('products')
            .doc(id)
            .delete()
            .then(() => {
                return true;
            })
            .catch((err) => {
                alert(err.message);
                return false;
            })
        });
    },

    getProductsQuantity({commit}){
        const user_id = JSON.parse(localStorage['userInfo'])['uid'];
        db.collection('products')
        .where('user_id', '==', user_id)
        .get().then((snap) => {
            commit('SET_QUANTITY_PRODUCTS', snap.size);
        });
    },
}