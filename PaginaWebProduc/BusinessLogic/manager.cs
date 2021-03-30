using DataAccess;
using Domain;
using System.Collections.Generic;
using System.Windows.Forms;


namespace BusinessLogic
{
    public class Manager
    {
     
        public static void Guardar(Producto producto, int id)
        {
            producto.Id = id;
            if ((producto.Id).Equals(0))
            {
                if (!Vacios(producto))
                {
                  Functions.Guardar(producto);
                  MessageBox.Show("Se añadio el prodcuto: " + producto.Nombre + " Con exito ");
                }
                else
                {
                   MessageBox.Show("Debe Completar los campos vacios!", "Cuidado");
                }

            }
            else
            {
                Functions.Modificar(producto);
                MessageBox.Show("El producto" + producto.Nombre + "Fue modificado correctamente");
            }
        }
        public static void Eliminar(int Id)
        {
            if (Id.Equals(0))
            {
                MessageBox.Show("Seleccione un producto de la lista , por favor", "Atencion");
            }
            else
            {
                if (MessageBox.Show("Quieres eliminar el producto?", "Esta por eliminar un producto", MessageBoxButtons.YesNo) == DialogResult.Yes)
                {
                    Functions.Eliminar(Id);
                }
            }
        }
        public static List<Producto> obtenerProducto()
        {
            return Functions.Obtener();
        }
        private static bool Vacios(Producto producto)//verificador de campos vacio 
                                                     //lo que hace aca es tomar un bollean , donde compara los campos de cada uno  en un 
                                                     //largo if , donde dice , si nombre y descripcion , etc esta vacio envia  un true  sino envia un false
        {
            bool isempty = true;
            if (!(string.IsNullOrEmpty(producto.Nombre)) || (string.IsNullOrEmpty(producto.Descripcion)) 
                || (producto.Precio==00) || (producto.Stock==00))
            {
                isempty = false;
                return isempty;
            }
            return isempty;
        }
    }

}
