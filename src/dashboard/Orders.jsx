import { useQuery } from '@tanstack/react-query'
import { FaTrash, FaUsers } from "react-icons/fa";
import axios from 'axios';
import UseCart from '../hooks/UseCart';


function Orders() {
  const [cart] = UseCart();
  // const [users, setUsers] = useState([]); useQuery look like useState
  const { refetch, data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:7000/orders/')
      // console.log(res.url); 
      return res.data;
    },
  });


  return (
    <div>
      <div className='flex items-center justify-between m-4 mt-10'>
        <h5>All Information : Dadka wx sodalbadey</h5>
        <h5>Total Users: {users.length}</h5>
      </div>

      {/* table to display all users */}
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[850px]">
            {/* head */}
            <thead className='bg-purple-500 text-white rounded-lg'>
              <tr>
                <th></th>
                <th>Email</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Image URL</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user, index) => (

                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{user.email}</td>
                    <td>{user.name}</td>
                    <td>{user.quantity}</td>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={user.ImageURL} alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                    </td>
                    <td>
                      {
                        user.role == 'admin' ? "Admin" : (
                          <button className='btn btn-xs bg-green-400 btn-circle text-white'><FaUsers /></button>
                        )
                      }
                    </td>

                  </tr>

                ))
              }

            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default Orders;