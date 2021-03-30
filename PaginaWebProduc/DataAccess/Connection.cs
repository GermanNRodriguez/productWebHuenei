using System.Data.SqlClient;

namespace DataAccess
{
    public class Connection
    {
        public static SqlConnection ConnectDB ()
        {
            string source = @"Data Source=GERNIROZ-PC\SQLEXPRESS; Initial Catalog=Taller; Integrated Security=true;";
            SqlConnection Conect = new SqlConnection(source);
            Conect.Open();
            return Conect;
        }

    }
}
