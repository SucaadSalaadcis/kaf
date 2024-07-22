import { useQuery } from '@tanstack/react-query'
import { FaTrash, FaUsers } from "react-icons/fa";
import axios from 'axios';


function Users() {

  // const [users, setUsers] = useState([]); useQuery look like useState
  const { refetch, data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axios.get('https://kafoon.onrender.com/users/')
      // console.log(res.url); 
      return res.data;
    },
  });

  

  

  const hangleDeleteUser =  (user) => {
     axios.delete(`https://kafoon.onrender.com/users/${user._id}`).then(res => {
      alert(`${user.name} is removed from database`)
       refetch();
     }).catch(err => console.log(err)) 
  }

  return (
    <div>
      <div className='flex items-center justify-between m-4 mt-10'>
        <h5>All Users</h5>
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
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user, index) => (

                  <tr key={index}>
                    <th>{index +1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {
                        user.role == 'admin' ? "Admin" : (
                          <button  className='btn btn-xs bg-green-400 btn-circle text-white'><FaUsers/></button>
                        )
                      }
                      </td>
                    <td><button onClick={() => hangleDeleteUser(user)} className='btn btn-xs bg-red-500 text-white'> <FaTrash/></button></td>
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

export default Users