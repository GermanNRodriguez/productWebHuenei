using Dominio;
using Negocio;
using System.Collections.Generic;
using System.Web.Http;
namespace web_api
{
    public class ProductosController : ApiController
        {
            public IEnumerable<Producto> Get()
            {
                return Verficadores.obtenerProducto();

            }
            public void Post([FromBody]Producto producto)
            {
            Verficadores.Guardar(producto);
            }

            // PUT api/<controller>/5
            public void Put([FromBody]Producto producto)
            {
                Verficadores.Guardar(producto);
            }

            // DELETE api/<controller>/5
            public void Delete(int id)
            {
                Verficadores.Eliminar(id);
            }
        }
    }