
class Helper {


    static user(instance)
    {
        if (instance.$route.query.user)
        {
            if (Object.hasOwnProperty('loader'))
            {
                instance.loader = true;
            }

            window.axios.get(`${window.location.origin}/users/${instance.$route.query.user}/view`).then((response) => {

                instance.form.user_id = response.data.body.model.id;
                instance.form.storage.user =  response.data.body.model;

            }).catch((error) => {
            }).finally(() => {

                if (Object.hasOwnProperty('loader'))
                {
                    instance.loader = false;
                }

            });
        }
    }

}


export default Helper;