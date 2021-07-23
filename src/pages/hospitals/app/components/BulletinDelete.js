import api from '../../../../services/Api';
import { toast } from 'react-toastify';



export default async function BulletinDelete(list) {

    const token = localStorage.getItem("token");
    var responseDelete = [];

    list.forEach((bulletinId, index) => {

        responseDelete[index] = api.delete("/bulletins/" + bulletinId, {
            headers: {
                'Authorization': 'Bearer ' + token
            },
        })
    })
    const results = await Promise.allSettled(responseDelete)

    const fulfilled = results.filter(result => result.status === 'fulfilled').map(result => result.value.status)
    console.log(fulfilled)

    const rejected = results.filter(result => result.status === 'rejected').map(result => result.reason)
    console.log(rejected)

    if (fulfilled.length > 0) {
        toast.success(fulfilled.length + ' boletim(s) apagado(s) com sucesso');
    }
    if (rejected.length > 0) {  
        toast.error('Não foi possível apagar '+ rejected.length + ' boletim(s)');
    }

}