import firebase from 'firebase/app';
import 'firebase/firestore'

const db = firebase.firestore();

export default{
    add_categorie({}, categorie){
        const user_id = JSON.parse(localStorage['userInfo'])['uid'];
        const cat = {
            name: categorie.name,
            description: categorie.description,
            user_id : user_id
        }
        
        return db.collection('categories').add(cat)
        .then((res) => {
            return res.id;
        })
        .catch((err) =>{
            alert(err.message);
            return null;
        });
    },

    get_categories({commit}){
        const docs = []
        const user_id = JSON.parse(localStorage['userInfo'])['uid']

        db.collection('categories')
        .where('user_id', '==', user_id)
        .get().then((res) => {
            res.forEach(doc => {
                docs.push({id:doc.id, data:doc.data()})
            });

            commit('SET_CATEGORIES', docs);
        }); 
    },

    get_categorie({commit}, id){
        const user_id = JSON.parse(localStorage['userInfo'])['uid']

        return db.collection('categories').doc(id)
        .get()
        .then((res) => {
            if(res.data() == undefined){return null}
            if(res.data().user_id != user_id){return null}
            
            const data = {
                id: id,
                description: res.data().description,
                name: res.data().name,
            }

            commit('SET_CATEGORIE', data);
            return data;
        })
        .catch((err) =>{
            alert(err.message);
            return null;
        });
    },

    modify_categorie({dispatch}, categorie){
        return dispatch('get_categorie', categorie.id)
        .then((doc_id) => {
            if(!doc_id){alert('Esta categoria no se encuentra registrada'); return null;}

            const user_id = JSON.parse(localStorage['userInfo'])['uid'];
            const cat = {
                name: categorie.name,
                description: categorie.description,
                user_id: user_id,
            }

            return db.collection('categories').doc(categorie.id)
            .set(cat)
            .then(() => {
                return true;
            })
            .catch((err) => {
                alert(err.message);
                return null;
            });

        });
    },

    delete_categorie({dispatch}, id){
        return dispatch('get_categorie', id)
        .then((doc_id) => {
            if(!doc_id){alert('Esta categoria no se encuentra registrada'); return null;}

            return db.collection('categories')
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

    getCategoriesQuantity({commit}){
        const user_id = JSON.parse(localStorage['userInfo'])['uid'];
        db.collection('categories')
        .where('user_id', '==', user_id)
        .get().then((snap) => {
            commit('SET_QUANTITY_CATEGORIES', snap.size);
        });
    }
}