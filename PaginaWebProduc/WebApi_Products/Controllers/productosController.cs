using BusinessLogic;
using DataAccess;
using Domain;
using System.Collections.Generic;
using System.Web.Http;
namespace web_api
{
    public class ProductosController : ApiController
    {
        public IEnumerable<Producto> Get()
        {
            return Manager.obtenerProducto();

        }
        public void Post([FromBody]Producto producto, int id)
        {
           Manager.Guardar(producto, id);
        }

        // PUT api/<controller>/5
        public void Put([FromBody]Producto producto, int id)
        {
            Manager.Guardar(producto, id);
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
            Manager.Eliminar(id);
        }
    }
}