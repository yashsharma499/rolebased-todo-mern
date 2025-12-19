


// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Users,
//   ListChecks,
//   Search,
//   Plus,
//   X,
//   Trash2,
//   Pencil,
//   Power,
//   Check,
// } from "lucide-react";
// import api from "../services/api";

// export default function AdminDashboard() {
//   const [todos, setTodos] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showAddUser, setShowAddUser] = useState(false);

//   const [editTodoId, setEditTodoId] = useState(null);
//   const [editTodoText, setEditTodoText] = useState("");

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   useEffect(() => {
//     fetchAdminData();
//   }, []);

//   const fetchAdminData = async () => {
//     const todosRes = await api.get("/todos/admin");
//     const usersRes = await api.get("/users");
//     setTodos(todosRes.data);
//     setUsers(usersRes.data);
//   };

//   const filteredUsers = users.filter(
//     (u) =>
//       u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       u.email.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const userTodos = todos.filter(
//     (t) => t.user?._id === selectedUser?._id
//   );

//   const toggleUserStatus = async (user) => {
//     await api.patch(`/users/${user._id}/status`, {
//       status: user.status === "active" ? "suspended" : "active",
//     });
//     fetchAdminData();
//   };

//   const handleDeleteTodo = async (id) => {
//     await api.delete(`/todos/${id}`);
//     fetchAdminData();
//   };

//   const handleEditTodo = async (id) => {
//     await api.put(`/todos/${id}`, { text: editTodoText });
//     setEditTodoId(null);
//     setEditTodoText("");
//     fetchAdminData();
//   };

//   const handleAddUser = async (e) => {
//     e.preventDefault();
//     await api.post("/users", { name, email, password });
//     setShowAddUser(false);
//     setName("");
//     setEmail("");
//     setPassword("");
//     fetchAdminData();
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-200 pb-24">
//       <main className="max-w-7xl mx-auto px-6 pt-16 space-y-12">

//         {/* Header */}
//         <header className="flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
//             <p className="text-slate-500 text-sm">Manage users and tasks</p>
//           </div>

//           <button
//             onClick={() => setShowAddUser(true)}
//             className="bg-gradient-to-r from-sky-600 to-blue-700 text-white px-5 py-3 rounded-2xl font-semibold shadow-lg"
//           >
//             <Plus size={18} /> Add User
//           </button>
//         </header>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <StatCard label="Total Users" value={users.length} icon={<Users />} />
//           <StatCard label="Total Tasks" value={todos.length} icon={<ListChecks />} />
//         </div>

//         {/* USERS */}
//         <section className="bg-white rounded-[2.75rem] shadow-md p-8 space-y-6">
//           <div className="relative max-w-sm">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//             <input
//               placeholder="Search users..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 bg-slate-100 rounded-xl"
//             />
//           </div>

//           <div className="space-y-4">
//             {filteredUsers.map((u) => (
//               <div
//                 key={u._id}
//                 onClick={() => setSelectedUser(u)}
//                 className="flex justify-between items-center bg-white rounded-2xl px-6 py-4 shadow-sm hover:shadow-md transition cursor-pointer"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center">
//                     {u.name[0]}
//                   </div>
//                   <div>
//                     <p className="font-semibold">{u.name}</p>
//                     <p className="text-xs text-slate-500">{u.email}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <span
//                     className={`text-xs font-semibold px-3 py-1 rounded-full ${
//                       u.status === "suspended"
//                         ? "bg-red-100 text-red-700"
//                         : "bg-green-100 text-green-700"
//                     }`}
//                   >
//                     {u.status || "active"}
//                   </span>

//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleUserStatus(u);
//                     }}
//                     className="p-2 rounded-lg hover:bg-slate-100"
//                   >
//                     <Power size={16} />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       </main>

//       {/* USER TODOS DRAWER */}
//       <AnimatePresence>
//         {selectedUser && (
//           <aside className="fixed inset-y-0 right-0 w-full sm:w-[420px] bg-white shadow-2xl p-6 space-y-6 z-50">
//             <div className="flex justify-between items-center">
//               <h2 className="text-lg font-semibold">
//                 {selectedUser.name}'s Todos
//               </h2>
//               <button onClick={() => setSelectedUser(null)}>
//                 <X />
//               </button>
//             </div>

//             <div className="space-y-3">
//               {userTodos.map((t) => (
//                 <div key={t._id} className="bg-slate-50 rounded-xl px-4 py-3">
//                   {editTodoId === t._id ? (
//                     <div className="flex gap-2">
//                       <input
//                         value={editTodoText}
//                         onChange={(e) => setEditTodoText(e.target.value)}
//                         className="flex-1 p-2 bg-white rounded-lg"
//                       />
//                       <button onClick={() => handleEditTodo(t._id)}>
//                         <Check />
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="flex justify-between items-center">
//                       <span>{t.text}</span>
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => {
//                             setEditTodoId(t._id);
//                             setEditTodoText(t.text);
//                           }}
//                         >
//                           <Pencil size={16} />
//                         </button>
//                         <button onClick={() => handleDeleteTodo(t._id)}>
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </aside>
//         )}
//       </AnimatePresence>

//       {/* ADD USER MODAL */}
//       {showAddUser && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
//           <form
//             onSubmit={handleAddUser}
//             className="bg-white rounded-3xl p-8 w-full max-w-md space-y-4"
//           >
//             <h2 className="text-xl font-semibold">Add New User</h2>

//             <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full p-3 bg-slate-100 rounded-xl" />
//             <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 bg-slate-100 rounded-xl" />
//             <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-3 bg-slate-100 rounded-xl" />

//             <div className="flex justify-end gap-3">
//               <button type="button" onClick={() => setShowAddUser(false)}>Cancel</button>
//               <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-xl">Create</button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// /* ---------- Components ---------- */

// function StatCard({ label, value, icon }) {
//   return (
//     <div className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-xl transition">
//       <div className="text-sky-600 mb-3">{icon}</div>
//       <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
//       <p className="text-3xl font-semibold">{value}</p>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Users,
//   ListChecks,
//   Search,
//   Plus,
//   X,
//   Trash2,
//   Pencil,
//   Power,
//   Check,
// } from "lucide-react";
// import api from "../services/api";

// export default function AdminDashboard() {
//   const [todos, setTodos] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showAddUser, setShowAddUser] = useState(false);

//   const [editTodoId, setEditTodoId] = useState(null);
//   const [editTodoText, setEditTodoText] = useState("");

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");

//   useEffect(() => {
//     fetchAdminData();
//   }, []);

//   const fetchAdminData = async () => {
//     const todosRes = await api.get("/todos/admin");
//     const usersRes = await api.get("/users");
//     setTodos(todosRes.data);
//     setUsers(usersRes.data);
//   };

//   const filteredUsers = users.filter(
//     (u) =>
//       u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       u.email.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const userTodos = todos.filter(
//     (t) => t.user?._id === selectedUser?._id
//   );

//   const toggleUserStatus = async (user) => {
//     await api.patch(`/users/${user._id}/status`, {
//       status: user.status === "active" ? "suspended" : "active",
//     });
//     fetchAdminData();
//   };

//   const handleDeleteTodo = async (id) => {
//     await api.delete(`/todos/${id}`);
//     fetchAdminData();
//   };

//   const handleEditTodo = async (id) => {
//     await api.put(`/todos/${id}`, { text: editTodoText });
//     setEditTodoId(null);
//     setEditTodoText("");
//     fetchAdminData();
//   };

//   /* ✅ UPDATED: INVITE USER (NO PASSWORD) */
//   const handleAddUser = async (e) => {
//     e.preventDefault();

//     await api.post("/users/invite", { name, email });

//     alert("Invite link sent to user's email");

//     setShowAddUser(false);
//     setName("");
//     setEmail("");
//     fetchAdminData();
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-200 pb-24">
//       <main className="max-w-7xl mx-auto px-6 pt-16 space-y-12">

//         {/* Header */}
//         <header className="flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
//             <p className="text-slate-500 text-sm">Manage users and tasks</p>
//           </div>

//           <button
//             onClick={() => setShowAddUser(true)}
//             className="bg-gradient-to-r from-sky-600 to-blue-700 text-white px-5 py-3 rounded-2xl font-semibold shadow-lg"
//           >
//             <Plus size={18} /> Invite User
//           </button>
//         </header>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <StatCard label="Total Users" value={users.length} icon={<Users />} />
//           <StatCard label="Total Tasks" value={todos.length} icon={<ListChecks />} />
//         </div>

//         {/* USERS */}
//         <section className="bg-white rounded-[2.75rem] shadow-md p-8 space-y-6">
//           <div className="relative max-w-sm">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//             <input
//               placeholder="Search users..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 bg-slate-100 rounded-xl"
//             />
//           </div>

//           <div className="space-y-4">
//             {filteredUsers.map((u) => (
//               <div
//                 key={u._id}
//                 onClick={() => setSelectedUser(u)}
//                 className="flex justify-between items-center bg-white rounded-2xl px-6 py-4 shadow-sm hover:shadow-md transition cursor-pointer"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center">
//                     {u.name[0]}
//                   </div>
//                   <div>
//                     <p className="font-semibold">{u.name}</p>
//                     <p className="text-xs text-slate-500">{u.email}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <span
//                     className={`text-xs font-semibold px-3 py-1 rounded-full ${
//                       u.status === "suspended"
//                         ? "bg-red-100 text-red-700"
//                         : "bg-green-100 text-green-700"
//                     }`}
//                   >
//                     {u.status || "active"}
//                   </span>

//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleUserStatus(u);
//                     }}
//                     className="p-2 rounded-lg hover:bg-slate-100"
//                   >
//                     <Power size={16} />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       </main>

//       {/* USER TODOS DRAWER */}
//       <AnimatePresence>
//         {selectedUser && (
//           <aside className="fixed inset-y-0 right-0 w-full sm:w-[420px] bg-white shadow-2xl p-6 space-y-6 z-50">
//             <div className="flex justify-between items-center">
//               <h2 className="text-lg font-semibold">
//                 {selectedUser.name}'s Todos
//               </h2>
//               <button onClick={() => setSelectedUser(null)}>
//                 <X />
//               </button>
//             </div>

//             <div className="space-y-3">
//               {userTodos.map((t) => (
//                 <div key={t._id} className="bg-slate-50 rounded-xl px-4 py-3">
//                   {editTodoId === t._id ? (
//                     <div className="flex gap-2">
//                       <input
//                         value={editTodoText}
//                         onChange={(e) => setEditTodoText(e.target.value)}
//                         className="flex-1 p-2 bg-white rounded-lg"
//                       />
//                       <button onClick={() => handleEditTodo(t._id)}>
//                         <Check />
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="flex justify-between items-center">
//                       <span>{t.text}</span>
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => {
//                             setEditTodoId(t._id);
//                             setEditTodoText(t.text);
//                           }}
//                         >
//                           <Pencil size={16} />
//                         </button>
//                         <button onClick={() => handleDeleteTodo(t._id)}>
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </aside>
//         )}
//       </AnimatePresence>

//       {/* ADD USER MODAL */}
//       {showAddUser && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
//           <form
//             onSubmit={handleAddUser}
//             className="bg-white rounded-3xl p-8 w-full max-w-md space-y-4"
//           >
//             <h2 className="text-xl font-semibold">Invite New User</h2>

//             <input
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Name"
//               className="w-full p-3 bg-slate-100 rounded-xl"
//               required
//             />
//             <input
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               type="email"
//               className="w-full p-3 bg-slate-100 rounded-xl"
//               required
//             />

//             <div className="flex justify-end gap-3">
//               <button type="button" onClick={() => setShowAddUser(false)}>
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white px-5 py-2 rounded-xl"
//               >
//                 Send Invite
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// /* ---------- Components ---------- */

// function StatCard({ label, value, icon }) {
//   return (
//     <div className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-xl transition">
//       <div className="text-sky-600 mb-3">{icon}</div>
//       <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
//       <p className="text-3xl font-semibold">{value}</p>
//     </div>
//   );
// }
// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Users,
//   ListChecks,
//   Search,
//   Plus,
//   X,
//   Trash2,
//   Pencil,
//   Power,
//   Check,
//   Sparkles,
//   TrendingUp,
// } from "lucide-react";
// import api from "../services/api";

// export default function AdminDashboard() {
//   const [todos, setTodos] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showAddUser, setShowAddUser] = useState(false);

//   const [editTodoId, setEditTodoId] = useState(null);
//   const [editTodoText, setEditTodoText] = useState("");

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");

//   useEffect(() => {
//     fetchAdminData();
//   }, []);

//   const fetchAdminData = async () => {
//     const todosRes = await api.get("/todos/admin");
//     const usersRes = await api.get("/users");
//     setTodos(todosRes.data);
//     setUsers(usersRes.data);
//   };

//   const filteredUsers = users.filter(
//     (u) =>
//       u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       u.email.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const userTodos = todos.filter(
//     (t) => t.user?._id === selectedUser?._id
//   );

//   const toggleUserStatus = async (user) => {
//     await api.patch(`/users/${user._id}/status`, {
//       status: user.status === "active" ? "suspended" : "active",
//     });
//     fetchAdminData();
//   };

//   const handleDeleteTodo = async (id) => {
//     await api.delete(`/todos/${id}`);
//     fetchAdminData();
//   };

//   const handleEditTodo = async (id) => {
//     await api.put(`/todos/${id}`, { text: editTodoText });
//     setEditTodoId(null);
//     setEditTodoText("");
//     fetchAdminData();
//   };

//   /* ✅ UPDATED: INVITE USER (NO PASSWORD) */
//   const handleAddUser = async (e) => {
//     e.preventDefault();

//     await api.post("/users/invite", { name, email });

//     alert("Invite link sent to user's email");

//     setShowAddUser(false);
//     setName("");
//     setEmail("");
//     fetchAdminData();
//   };

//   return (
//     <div className="min-h-screen bg-blue-100 pb-24">
//       <motion.main
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="max-w-7xl mx-auto px-6 pt-14 space-y-10"
//       >
//         {/* HEADER */}
//         <header className="space-y-4">
//           <div className="flex items-center gap-2 text-purple-700 text-sm font-bold uppercase">
//             <Sparkles size={16} /> Admin Workspace
//           </div>

//           <div className="flex justify-between items-end flex-wrap gap-4">
//             <div>
//               <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
//                 Admin Dashboard
//               </h1>
//               <p className="text-slate-600 mt-2">
//                 Manage users and their tasks efficiently ✨
//               </p>
//             </div>

//             <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-2xl shadow-lg">
//               <TrendingUp size={18} />
//               <span className="font-semibold">{users.length} Users</span>
//             </div>
//           </div>
//         </header>

//         {/* STATS */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           <StatCard label="Total Users" value={users.length} icon={<Users />} />
//           <StatCard label="Total Tasks" value={todos.length} icon={<ListChecks />} />
//           <StatCard label="Active Users" value={users.filter(u => u.status === 'active').length} icon={<Users />} />
//           <StatCard label="Suspended Users" value={users.filter(u => u.status === 'suspended').length} icon={<Users />} />
//         </div>

//         {/* ADD USER */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 space-y-4">
//           <div className="flex items-center justify-between">
//             <h2 className="text-xl font-bold text-slate-800">User Management</h2>
//             <button
//               onClick={() => setShowAddUser(true)}
//               className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
//             >
//               <Plus size={18} /> Invite User
//             </button>
//           </div>

//           {/* SEARCH */}
//           <div className="relative max-w-md">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//             <input
//               placeholder="Search users by name or email..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
//             />
//           </div>
//         </div>

//         {/* USER LIST */}
//         <section className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 space-y-6">
//           <div className="flex justify-between items-center">
//             <h2 className="text-xl font-bold text-slate-800">All Users</h2>
//             <span className="text-sm text-slate-500">
//               {filteredUsers.length} users
//             </span>
//           </div>

//           <div className="space-y-4">
//             {filteredUsers.map((u) => (
//               <motion.div
//                 key={u._id}
//                 whileHover={{ y: -4 }}
//                 onClick={() => setSelectedUser(u)}
//                 className="flex justify-between items-center bg-white rounded-2xl px-6 py-4 shadow-md hover:shadow-xl transition cursor-pointer"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white flex items-center justify-center font-bold text-lg">
//                     {u.name[0]}
//                   </div>
//                   <div>
//                     <p className="font-semibold text-lg">{u.name}</p>
//                     <p className="text-sm text-slate-500">{u.email}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4">
//                   <span
//                     className={`text-sm font-semibold px-3 py-1 rounded-full ${
//                       u.status === "suspended"
//                         ? "bg-red-100 text-red-700"
//                         : "bg-green-100 text-green-700"
//                     }`}
//                   >
//                     {u.status || "active"}
//                   </span>

//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleUserStatus(u);
//                     }}
//                     className="p-2 rounded-lg hover:bg-slate-100"
//                   >
//                     <Power size={18} />
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </section>
//       </motion.main>

//       {/* USER TODOS DRAWER */}
//       <AnimatePresence>
//         {selectedUser && (
//           <aside className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-white/90 backdrop-blur-xl shadow-2xl p-8 space-y-6 z-50">
//             <div className="flex justify-between items-center">
//               <h2 className="text-2xl font-bold text-slate-800">
//                 {selectedUser.name}'s Todos
//               </h2>
//               <button 
//                 onClick={() => setSelectedUser(null)}
//                 className="p-2 hover:bg-slate-100 rounded-xl"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="space-y-3">
//               {userTodos.map((t) => (
//                 <div key={t._id} className="bg-white rounded-2xl p-4 shadow-md">
//                   {editTodoId === t._id ? (
//                     <div className="flex gap-2">
//                       <input
//                         value={editTodoText}
//                         onChange={(e) => setEditTodoText(e.target.value)}
//                         className="flex-1 p-3 bg-slate-50 rounded-xl border"
//                         autoFocus
//                       />
//                       <button 
//                         onClick={() => handleEditTodo(t._id)}
//                         className="bg-green-500 text-white p-3 rounded-xl"
//                       >
//                         <Check size={18} />
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="flex justify-between items-center">
//                       <span className="font-medium">{t.text}</span>
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => {
//                             setEditTodoId(t._id);
//                             setEditTodoText(t.text);
//                           }}
//                           className="p-2 hover:bg-blue-100 rounded-lg"
//                         >
//                           <Pencil size={16} />
//                         </button>
//                         <button 
//                           onClick={() => handleDeleteTodo(t._id)}
//                           className="p-2 hover:bg-red-100 rounded-lg"
//                         >
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </aside>
//         )}
//       </AnimatePresence>

//       {/* ADD USER MODAL */}
//       {showAddUser && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
//           <form
//             onSubmit={handleAddUser}
//             className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md space-y-6 shadow-2xl"
//           >
//             <h2 className="text-2xl font-bold text-slate-800">Invite New User</h2>

//             <div className="space-y-4">
//               <input
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Full Name"
//                 className="w-full p-3 bg-slate-50 rounded-xl border focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
//                 required
//               />
//               <input
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Email Address"
//                 type="email"
//                 className="w-full p-3 bg-slate-50 rounded-xl border focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
//                 required
//               />
//             </div>

//             <div className="flex justify-end gap-3">
//               <button 
//                 type="button" 
//                 onClick={() => setShowAddUser(false)}
//                 className="px-5 py-2 rounded-xl hover:bg-slate-100"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold"
//               >
//                 Send Invite
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// /* ---------- Components ---------- */

// function StatCard({ label, value, icon }) {
//   return (
//     <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 hover:scale-105 transition">
//       <div className="text-purple-600 mb-2">{icon}</div>
//       <p className="text-xs uppercase text-slate-500">{label}</p>
//       <p className="text-3xl font-bold">{value}</p>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Users,
//   ListChecks,
//   Search,
//   Plus,
//   X,
//   Trash2,
//   Pencil,
//   Power,
//   Check,
//   Sparkles,
//   TrendingUp,
//   UserCheck,
//   UserX,
// } from "lucide-react";
// import api from "../services/api";

// export default function AdminDashboard() {
//   const [todos, setTodos] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showAddUser, setShowAddUser] = useState(false);

//   const [editTodoId, setEditTodoId] = useState(null);
//   const [editTodoText, setEditTodoText] = useState("");

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");

//   useEffect(() => {
//     fetchAdminData();
//   }, []);

//   const fetchAdminData = async () => {
//     const todosRes = await api.get("/todos/admin");
//     const usersRes = await api.get("/users");
//     setTodos(todosRes.data);
//     setUsers(usersRes.data);
//   };

//   const filteredUsers = users.filter(
//     (u) =>
//       u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       u.email.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const userTodos = todos.filter(
//     (t) => t.user?._id === selectedUser?._id
//   );

//   const toggleUserStatus = async (user) => {
//     await api.patch(`/users/${user._id}/status`, {
//       status: user.status === "active" ? "suspended" : "active",
//     });
//     fetchAdminData();
//   };

//   const handleDeleteTodo = async (id) => {
//     await api.delete(`/todos/${id}`);
//     fetchAdminData();
//   };

//   const handleEditTodo = async (id) => {
//     await api.put(`/todos/${id}`, { text: editTodoText });
//     setEditTodoId(null);
//     setEditTodoText("");
//     fetchAdminData();
//   };

//   /* ✅ UPDATED: INVITE USER (NO PASSWORD) */
//   const handleAddUser = async (e) => {
//     e.preventDefault();

//     await api.post("/users/invite", { name, email });

//     alert("Invite link sent to user's email");

//     setShowAddUser(false);
//     setName("");
//     setEmail("");
//     fetchAdminData();
//   };

//   return (
//     <div className="min-h-screen bg-blue-100 pb-24">
//       <motion.main
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="max-w-7xl mx-auto px-6 pt-14 space-y-10"
//       >
//         {/* HEADER */}
//         <header className="space-y-4">
//           <div className="flex items-center gap-2 text-purple-700 text-sm font-bold uppercase">
//             <Sparkles size={16} /> Admin Workspace
//           </div>

//           <div className="flex justify-between items-end flex-wrap gap-4">
//             <div>
//               <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
//                 Admin Dashboard
//               </h1>
//               <p className="text-slate-600 mt-2">
//                 Manage users and their tasks efficiently ✨
//               </p>
//             </div>

//             <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-2xl shadow-lg">
//               <TrendingUp size={18} />
//               <span className="font-semibold">{users.length} Users</span>
//             </div>
//           </div>
//         </header>

//         {/* STATS */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           <StatCard 
//             label="Total Users" 
//             value={users.length} 
//             icon={<Users />}
//             color="purple"
//           />
//           <StatCard 
//             label="Total Tasks" 
//             value={todos.length} 
//             icon={<ListChecks />}
//             color="blue"
//           />
//           <StatCard 
//             label="Active Users" 
//             value={users.filter(u => u.status === 'active').length} 
//             icon={<UserCheck />}
//             color="green"
//           />
//           <StatCard 
//             label="Suspended Users" 
//             value={users.filter(u => u.status === 'suspended').length} 
//             icon={<UserX />}
//             color="red"
//           />
//         </div>

//         {/* ADD USER */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 space-y-4">
//           <div className="flex items-center justify-between">
//             <h2 className="text-xl font-bold text-slate-800">User Management</h2>
//             <button
//               onClick={() => setShowAddUser(true)}
//               className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
//             >
//               <Plus size={18} /> Invite User
//             </button>
//           </div>

//           {/* SEARCH */}
//           <div className="relative max-w-md">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//             <input
//               placeholder="Search users by name or email..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
//             />
//           </div>
//         </div>

//         {/* USER LIST */}
//         <section className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 space-y-6">
//           <div className="flex justify-between items-center">
//             <h2 className="text-xl font-bold text-slate-800">All Users</h2>
//             <span className="text-sm text-slate-500">
//               {filteredUsers.length} users
//             </span>
//           </div>

//           <div className="space-y-4">
//             {filteredUsers.map((u) => (
//               <motion.div
//                 key={u._id}
//                 whileHover={{ y: -4 }}
//                 onClick={() => setSelectedUser(u)}
//                 className="flex justify-between items-center bg-white rounded-2xl px-6 py-4 shadow-md hover:shadow-xl transition cursor-pointer"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white flex items-center justify-center font-bold text-lg">
//                     {u.name[0]}
//                   </div>
//                   <div>
//                     <p className="font-semibold text-lg">{u.name}</p>
//                     <p className="text-sm text-slate-500">{u.email}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4">
//                   <span
//                     className={`text-sm font-semibold px-3 py-1 rounded-full ${
//                       u.status === "suspended"
//                         ? "bg-red-100 text-red-700"
//                         : "bg-green-100 text-green-700"
//                     }`}
//                   >
//                     {u.status || "active"}
//                   </span>

//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleUserStatus(u);
//                     }}
//                     className="p-2 rounded-lg hover:bg-slate-100"
//                   >
//                     <Power size={18} />
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </section>
//       </motion.main>

//       {/* USER TODOS DRAWER */}
//       <AnimatePresence>
//         {selectedUser && (
//           <aside className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-white/90 backdrop-blur-xl shadow-2xl p-8 space-y-6 z-50">
//             <div className="flex justify-between items-center">
//               <h2 className="text-2xl font-bold text-slate-800">
//                 {selectedUser.name}'s Todos
//               </h2>
//               <button 
//                 onClick={() => setSelectedUser(null)}
//                 className="p-2 hover:bg-slate-100 rounded-xl"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="space-y-3">
//               {userTodos.map((t) => (
//                 <div key={t._id} className="bg-white rounded-2xl p-4 shadow-md">
//                   {editTodoId === t._id ? (
//                     <div className="flex gap-2">
//                       <input
//                         value={editTodoText}
//                         onChange={(e) => setEditTodoText(e.target.value)}
//                         className="flex-1 p-3 bg-slate-50 rounded-xl border"
//                         autoFocus
//                       />
//                       <button 
//                         onClick={() => handleEditTodo(t._id)}
//                         className="bg-green-500 text-white p-3 rounded-xl"
//                       >
//                         <Check size={18} />
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="flex justify-between items-center">
//                       <span className="font-medium">{t.text}</span>
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => {
//                             setEditTodoId(t._id);
//                             setEditTodoText(t.text);
//                           }}
//                           className="p-2 hover:bg-blue-100 rounded-lg"
//                         >
//                           <Pencil size={16} />
//                         </button>
//                         <button 
//                           onClick={() => handleDeleteTodo(t._id)}
//                           className="p-2 hover:bg-red-100 rounded-lg"
//                         >
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </aside>
//         )}
//       </AnimatePresence>

//       {/* ADD USER MODAL */}
//       {showAddUser && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
//           <form
//             onSubmit={handleAddUser}
//             className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md space-y-6 shadow-2xl"
//           >
//             <h2 className="text-2xl font-bold text-slate-800">Invite New User</h2>

//             <div className="space-y-4">
//               <input
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Full Name"
//                 className="w-full p-3 bg-slate-50 rounded-xl border focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
//                 required
//               />
//               <input
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Email Address"
//                 type="email"
//                 className="w-full p-3 bg-slate-50 rounded-xl border focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
//                 required
//               />
//             </div>

//             <div className="flex justify-end gap-3">
//               <button 
//                 type="button" 
//                 onClick={() => setShowAddUser(false)}
//                 className="px-5 py-2 rounded-xl hover:bg-slate-100"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold"
//               >
//                 Send Invite
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// /* ---------- Updated StatCard Component with Colors ---------- */
// function StatCard({ label, value, icon, color }) {
//   const colorClasses = {
//     purple: "from-purple-500/10 to-purple-600/10 border-purple-200 text-purple-600",
//     blue: "from-blue-500/10 to-blue-600/10 border-blue-200 text-blue-600",
//     green: "from-green-500/10 to-green-600/10 border-green-200 text-green-600",
//     red: "from-red-500/10 to-red-600/10 border-red-200 text-red-600",
//   };

//   const iconBgClasses = {
//     purple: "bg-gradient-to-br from-purple-500 to-purple-600",
//     blue: "bg-gradient-to-br from-blue-500 to-blue-600",
//     green: "bg-gradient-to-br from-green-500 to-green-600",
//     red: "bg-gradient-to-br from-red-500 to-red-600",
//   };

//   return (
//     <div className={`bg-gradient-to-br ${colorClasses[color]} backdrop-blur-xl rounded-2xl shadow-lg p-6 hover:scale-105 transition border`}>
//       <div className="flex items-start justify-between">
//         <div>
//           <p className="text-xs uppercase text-slate-600 font-semibold mb-2">{label}</p>
//           <p className="text-3xl font-bold">{value}</p>
//         </div>
//         <div className={`${iconBgClasses[color]} p-3 rounded-xl text-white`}>
//           {icon}
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  ListChecks,
  Search,
  Plus,
  X,
  Trash2,
  Pencil,
  Power,
  Check,
  Sparkles,
  TrendingUp,
  UserCheck,
  UserX,
} from "lucide-react";
import api from "../services/api";

export default function AdminDashboard() {
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddUser, setShowAddUser] = useState(false);

  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    const todosRes = await api.get("/todos/admin");
    const usersRes = await api.get("/users");
    setTodos(todosRes.data);
    setUsers(usersRes.data);
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const userTodos = todos.filter(
    (t) => t.user?._id === selectedUser?._id
  );

  const toggleUserStatus = async (user) => {
    await api.patch(`/users/${user._id}/status`, {
      status: user.status === "active" ? "suspended" : "active",
    });
    fetchAdminData();
  };

  const handleDeleteTodo = async (id) => {
    await api.delete(`/todos/${id}`);
    fetchAdminData();
  };

  const handleEditTodo = async (id) => {
    await api.put(`/todos/${id}`, { text: editTodoText });
    setEditTodoId(null);
    setEditTodoText("");
    fetchAdminData();
  };

  /* ✅ UPDATED: INVITE USER (NO PASSWORD) */
  const handleAddUser = async (e) => {
    e.preventDefault();

    await api.post("/users/invite", { name, email });

    alert("Invite link sent to user's email");

    setShowAddUser(false);
    setName("");
    setEmail("");
    fetchAdminData();
  };

  return (
    <div className="min-h-screen bg-blue-100 pb-24">
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 pt-14 space-y-10"
      >
        {/* HEADER */}
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-purple-700 text-sm font-bold uppercase">
            <Sparkles size={16} /> Admin Workspace
          </div>

          <div className="flex justify-between items-end flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-slate-600 mt-2">
                Manage users and their tasks efficiently ✨
              </p>
            </div>

            <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-2xl shadow-lg">
              <TrendingUp size={18} />
              <span className="font-semibold">{users.length} Users</span>
            </div>
          </div>
        </header>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            label="Total Users" 
            value={users.length} 
            icon={<Users />}
            color="purple"
          />
          <StatCard 
            label="Total Tasks" 
            value={todos.length} 
            icon={<ListChecks />}
            color="blue"
          />
          <StatCard 
            label="Active Users" 
            value={users.filter(u => u.status === 'active').length} 
            icon={<UserCheck />}
            color="green"
          />
          <StatCard 
            label="Suspended Users" 
            value={users.filter(u => u.status === 'suspended').length} 
            icon={<UserX />}
            color="red"
          />
        </div>

        {/* ADD USER - With Purple Gradient Background */}
        <div className="bg-gradient-to-br from-purple-50 via-purple-50/80 to-pink-50 backdrop-blur-xl rounded-3xl shadow-xl p-8 space-y-6 border border-purple-200/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-purple-800">User Management</h2>
              <p className="text-purple-600/80 mt-1">Invite new users and manage existing ones</p>
            </div>
            <button
              onClick={() => setShowAddUser(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-purple-500/30"
            >
              <Plus size={18} /> Invite User
            </button>
          </div>

          {/* SEARCH */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={18} />
            <input
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-purple-200 focus:bg-white focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all text-purple-900 placeholder-purple-400"
            />
          </div>
        </div>

        {/* USER LIST - With Blue Gradient Background */}
        <section className="bg-gradient-to-br from-blue-50 via-blue-50/80 to-indigo-50 backdrop-blur-xl rounded-3xl shadow-xl p-8 space-y-6 border border-blue-200/50">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-blue-800">All Users</h2>
              <p className="text-blue-600/80 text-sm mt-1">Click on any user to view their tasks</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-blue-600 font-medium bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
                {filteredUsers.length} users
              </span>
              <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                users.filter(u => u.status === 'active').length === users.length
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700"
              }`}>
                {users.filter(u => u.status === 'active').length}/{users.length} active
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {filteredUsers.map((u) => (
              <motion.div
                key={u._id}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedUser(u)}
                className="flex justify-between items-center bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-md hover:shadow-xl transition cursor-pointer border border-blue-100"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
                    {u.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-slate-800">{u.name}</p>
                    <p className="text-sm text-slate-600">{u.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`text-sm font-semibold px-3 py-1.5 rounded-full ${
                      u.status === "suspended"
                        ? "bg-red-100 text-red-700 border border-red-200"
                        : "bg-green-100 text-green-700 border border-green-200"
                    }`}
                  >
                    {u.status || "active"}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleUserStatus(u);
                    }}
                    className={`p-2.5 rounded-xl ${
                      u.status === "suspended"
                        ? "hover:bg-green-100 text-green-600"
                        : "hover:bg-red-100 text-red-600"
                    }`}
                  >
                    <Power size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.main>

      {/* USER TODOS DRAWER */}
      <AnimatePresence>
        {selectedUser && (
          <aside className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-gradient-to-b from-purple-50/90 to-blue-50/90 backdrop-blur-xl shadow-2xl p-8 space-y-6 z-50 border-l border-purple-200/50">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {selectedUser.name}'s Todos
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  {userTodos.length} tasks total
                </p>
              </div>
              <button 
                onClick={() => setSelectedUser(null)}
                className="p-2 hover:bg-slate-100 rounded-xl"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              {userTodos.map((t) => (
                <div key={t._id} className="bg-white rounded-2xl p-4 shadow-md border">
                  {editTodoId === t._id ? (
                    <div className="flex gap-2">
                      <input
                        value={editTodoText}
                        onChange={(e) => setEditTodoText(e.target.value)}
                        className="flex-1 p-3 bg-slate-50 rounded-xl border focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                        autoFocus
                      />
                      <button 
                        onClick={() => handleEditTodo(t._id)}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-xl"
                      >
                        <Check size={18} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-800">{t.text}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditTodoId(t._id);
                            setEditTodoText(t.text);
                          }}
                          className="p-2 hover:bg-blue-100 rounded-lg text-blue-600"
                        >
                          <Pencil size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteTodo(t._id)}
                          className="p-2 hover:bg-red-100 rounded-lg text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </aside>
        )}
      </AnimatePresence>

      {/* ADD USER MODAL */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <form
            onSubmit={handleAddUser}
            className="bg-gradient-to-br from-purple-50/95 via-white/95 to-pink-50/95 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md space-y-6 shadow-2xl border border-purple-200/50"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl text-white">
                <Plus size={20} />
              </div>
              <h2 className="text-2xl font-bold text-purple-800">Invite New User</h2>
            </div>

            <div className="space-y-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full p-3.5 bg-white/80 backdrop-blur-sm rounded-xl border border-purple-200 focus:bg-white focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all text-slate-800"
                required
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                type="email"
                className="w-full p-3.5 bg-white/80 backdrop-blur-sm rounded-xl border border-purple-200 focus:bg-white focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all text-slate-800"
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button 
                type="button" 
                onClick={() => setShowAddUser(false)}
                className="px-5 py-2.5 rounded-xl hover:bg-slate-100 text-slate-600 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-purple-500/30"
              >
                Send Invite
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

/* ---------- Updated StatCard Component with Colors ---------- */
function StatCard({ label, value, icon, color }) {
  const colorClasses = {
    purple: "from-purple-500/10 to-purple-600/10 border-purple-200 text-purple-600",
    blue: "from-blue-500/10 to-blue-600/10 border-blue-200 text-blue-600",
    green: "from-green-500/10 to-green-600/10 border-green-200 text-green-600",
    red: "from-red-500/10 to-red-600/10 border-red-200 text-red-600",
  };

  const iconBgClasses = {
    purple: "bg-gradient-to-br from-purple-500 to-purple-600",
    blue: "bg-gradient-to-br from-blue-500 to-blue-600",
    green: "bg-gradient-to-br from-green-500 to-green-600",
    red: "bg-gradient-to-br from-red-500 to-red-600",
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} backdrop-blur-xl rounded-2xl shadow-lg p-6 hover:scale-105 transition border`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase text-slate-600 font-semibold mb-2">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className={`${iconBgClasses[color]} p-3 rounded-xl text-white shadow-md`}>
          {icon}
        </div>
      </div>
    </div>
  );
}