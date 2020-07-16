import firebase from 'firebase/app';
import 'firebase/firestore'

const db = firebase.firestore();

export default{
    add_supplier({}, supplier){
        const user_id = JSON.parse(localStorage['userInfo'])['uid'];
        const sup = {
            name: supplier.name,
            nit: supplier.nit,
            city: supplier.city,
            address: supplier.address,
            phone: supplier.phone,
            user_id : user_id
        }
        
        return db.collection('suppliers').add(sup)
        .then((res) => {
            return res.id;
        })
        .catch((err) =>{
            alert(err.message);
            return null;
        });
    },

    get_suppliers({commit}){
        const docs = []
        const user_id = JSON.parse(localStorage['userInfo'])['uid']

        db.collection('suppliers')
        .where('user_id', '==', user_id)
        .get().then((res) => {
            res.forEach(doc => {
                docs.push({id:doc.id, data:doc.data()})
            });

            commit('SET_SUPPLIERS', docs);
        }); 
    },

    get_supplier({commit}, id){
        const user_id = JSON.parse(localStorage['userInfo'])['uid']

        return db.collection('suppliers').doc(id)
        .get()
        .then((res) => {
            if(res.data() == undefined){return null}
            if(res.data().user_id != user_id){return null}

            commit('SET_SUPPLIER', res.data());
            commit('SET_SUPPLIER_ID', id);
            return res.data();
        })
        .catch((err) =>{
            alert(err.message);
            return null;
        });
    },

    modify_supplier({dispatch}, supplier){
        return dispatch('get_supplier', supplier.id)
        .then((doc_id) => {
            if(!doc_id){alert('Este proveedor no se encuentra registrado.'); return null;}

            const user_id = JSON.parse(localStorage['userInfo'])['uid'];
            const sup = {
                name: supplier.name,
                nit: supplier.nit,
                city: supplier.city,
                address: supplier.address,
                phone: supplier.phone,
                user_id : user_id
            }

            return db.collection('suppliers').doc(supplier.id)
            .set(sup)
            .then(() => {
                return true;
            })
            .catch((err) => {
                alert(err.message);
                return null;
            });

        });
    },

    delete_supplier({dispatch}, id){
        return dispatch('get_supplier', id)
        .then((doc_id) => {
            if(!doc_id){alert('Este proveedor no se encuentra registrado'); return null;}

            return db.collection('suppliers')
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

    getSuppliersQuantity({commit}){
        const user_id = JSON.parse(localStorage['userInfo'])['uid'];
        db.collection('suppliers')
        .where('user_id', '==', user_id)
        .get().then((snap) => {
            commit('SET_QUANTITY_SUPPLIERS', snap.size);
        });
    }
}