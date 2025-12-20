

// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useAuth } from "../context/AuthContext";
// import api from "../services/api";
// import {
//   Trash2,
//   Pencil,
//   Check,
//   Plus,
//   LayoutDashboard,
//   CalendarDays,
//   CheckCircle2,
//   Sparkles,
//   TrendingUp,
//   Clock,
//   Zap,
//   X,
// } from "lucide-react";

// export default function UserDashboard() {
//   const { user } = useAuth();

//   const [todos, setTodos] = useState([]);
//   const [task, setTask] = useState("");
//   const [dueDate, setDueDate] = useState("");
//   const [priority, setPriority] = useState("medium");
//   const [editId, setEditId] = useState(null);
//   const [filter, setFilter] = useState("all");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   const fetchTodos = async () => {
//     const res = await api.get("/todos");
//     setTodos(res.data);
//   };

//   const resetForm = () => {
//     setTask("");
//     setDueDate("");
//     setPriority("medium");
//     setEditId(null);
//   };

//   const handleAddOrUpdate = async (e) => {
//     e?.preventDefault();
//     if (!task.trim()) return;

//     setLoading(true);

//     if (editId) {
//       const res = await api.put(`/todos/${editId}`, {
//         text: task,
//         dueDate,
//         priority,
//       });

//       setTodos((prev) =>
//         prev.map((t) => (t._id === editId ? res.data : t))
//       );
//       resetForm();
//       setLoading(false);
//       return;
//     }

//     const res = await api.post("/todos", {
//       text: task,
//       dueDate,
//       priority,
//     });

//     setTodos((prev) => [res.data, ...prev]);
//     resetForm();
//     setLoading(false);
//   };

//   const toggleComplete = async (id) => {
//     const todo = todos.find((t) => t._id === id);
//     const res = await api.put(`/todos/${id}`, {
//       completed: !todo.completed,
//     });

//     setTodos((prev) =>
//       prev.map((t) => (t._id === id ? res.data : t))
//     );
//   };

//   const deleteTodo = async (id) => {
//     await api.delete(`/todos/${id}`);
//     setTodos((prev) => prev.filter((t) => t._id !== id));
//   };

//   const startEdit = (todo) => {
//     setEditId(todo._id);
//     setTask(todo.text);
//     setDueDate(todo.dueDate || "");
//     setPriority(todo.priority || "medium");
//   };

//   const filteredTodos = todos.filter((t) => {
//     if (filter === "active") return !t.completed;
//     if (filter === "completed") return t.completed;
//     return true;
//   });

//   const completedCount = todos.filter((t) => t.completed).length;
//   const activeCount = todos.filter((t) => !t.completed).length;
//   const completionRate =
//     todos.length > 0
//       ? Math.round((completedCount / todos.length) * 100)
//       : 0;

//   return (
//     // <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pb-28">
//     <div className="min-h-screen bg-blue-100 pb-28">
//       <motion.main
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="max-w-6xl mx-auto px-6 pt-14 space-y-10"
//       >
//         {/* HEADER */}
//         <header className="space-y-4">
//           <div className="flex items-center gap-2 text-purple-700 text-sm font-bold uppercase">
//             <Sparkles size={16} /> Personal Workspace
//           </div>

//           <div className="flex justify-between items-end flex-wrap gap-4">
//             <div>
//               <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
//                 Welcome, {user?.name || "User"}
//               </h1>
//               <p className="text-slate-600 mt-2">
//                 Let’s focus on what matters today ✨
//               </p>
//             </div>

//             <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-2xl shadow-lg">
//               <TrendingUp size={18} />
//               <span className="font-semibold">{completionRate}% Complete</span>
//             </div>
//           </div>
//         </header>

//         {/* STATS */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           <StatCard label="Total Tasks" value={todos.length} icon={<LayoutDashboard />} />
//           <StatCard label="Completed" value={completedCount} icon={<CheckCircle2 />} />
//           <StatCard label="In Progress" value={activeCount} icon={<Clock />} />
//           <StatCard label="Success Rate" value={`${completionRate}%`} icon={<Zap />} />
//         </div>

//         {/* ADD TASK */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 space-y-4">
//           <div className="flex items-center gap-3 bg-purple-50 rounded-2xl p-4">
//             <Plus className="text-purple-600" />
//             <input
//               className="flex-1 bg-transparent outline-none text-lg"
//               placeholder={editId ? "Update task..." : "Add a new task..."}
//               value={task}
//               onChange={(e) => setTask(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleAddOrUpdate(e)}
//             />
//             {editId && (
//               <button onClick={resetForm} className="p-2 hover:bg-red-100 rounded-xl">
//                 <X className="text-red-500" />
//               </button>
//             )}
//           </div>

//           <div className="flex flex-col sm:flex-row gap-3">
//             <input
//               type="date"
//               value={dueDate}
//               onChange={(e) => setDueDate(e.target.value)}
//               className="px-4 py-3 rounded-xl bg-slate-50 border"
//             />

//             <select
//               value={priority}
//               onChange={(e) => setPriority(e.target.value)}
//               className="px-4 py-3 rounded-xl bg-slate-50 border"
//             >
//               <option value="low">🟢 Low</option>
//               <option value="medium">🟡 Medium</option>
//               <option value="high">🔴 High</option>
//             </select>

//             <button
//               onClick={handleAddOrUpdate}
//               disabled={loading}
//               className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold"
//             >
//               {loading ? "Saving..." : editId ? "Update Task" : "Add Task"}
//             </button>
//           </div>
//         </div>

//         {/* TASK LIST */}
//         <section className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 space-y-6">
//           <div className="flex justify-between items-center">
//             <div className="flex bg-purple-100 rounded-2xl p-1">
//               <FilterTab label="All" active={filter === "all"} onClick={() => setFilter("all")} />
//               <FilterTab label="Active" active={filter === "active"} onClick={() => setFilter("active")} />
//               <FilterTab label="Completed" active={filter === "completed"} onClick={() => setFilter("completed")} />
//             </div>

//             <span className="text-sm text-slate-500">
//               {filteredTodos.length} items
//             </span>
//           </div>

//           <AnimatePresence>
//             <div className="space-y-3">
//               {filteredTodos.map((todo) => (
//                 <motion.div
//                   key={todo._id}
//                   whileHover={{ y: -4 }}
//                   className="bg-white rounded-2xl p-5 shadow-md"
//                 >
//                   <div className="flex justify-between">
//                     <div className="flex gap-4">
//                       <button
//                         onClick={() => toggleComplete(todo._id)}
//                         className={`w-7 h-7 rounded-xl ${
//                           todo.completed
//                             ? "bg-green-500"
//                             : "bg-slate-200"
//                         }`}
//                       >
//                         {todo.completed && <Check size={16} className="text-white mx-auto" />}
//                       </button>

//                       <div>
//                         <p className={`font-semibold ${todo.completed && "line-through text-slate-400"}`}>
//                           {todo.text}
//                         </p>

//                         <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
//                           {todo.dueDate && (
//                             <span className="flex items-center gap-1">
//                               <CalendarDays size={12} />
//                               {new Date(todo.dueDate).toLocaleDateString("en-IN")}
//                             </span>
//                           )}

//                           <span className={`px-2 py-0.5 rounded-full font-semibold ${
//                             todo.priority === "high"
//                               ? "bg-red-100 text-red-600"
//                               : todo.priority === "medium"
//                               ? "bg-yellow-100 text-yellow-700"
//                               : "bg-green-100 text-green-600"
//                           }`}>
//                             {todo.priority}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex gap-2">
//                       <button onClick={() => startEdit(todo)} className="p-2 hover:bg-blue-100 rounded-lg">
//                         <Pencil size={16} />
//                       </button>
//                       <button onClick={() => deleteTodo(todo._id)} className="p-2 hover:bg-red-100 rounded-lg">
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </AnimatePresence>
//         </section>
//       </motion.main>
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

// function FilterTab({ label, active, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`px-5 py-2 rounded-xl text-sm font-semibold transition ${
//         active ? "bg-white shadow text-purple-700" : "text-slate-600"
//       }`}
//     >
//       {label}
//     </button>
//   );
// }



// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useAuth } from "../context/AuthContext";
// import api from "../services/api";
// import {
//   Trash2,
//   Pencil,
//   Check,
//   Plus,
//   LayoutDashboard,
//   CalendarDays,
//   CheckCircle2,
//   Sparkles,
//   TrendingUp,
//   Clock,
//   Zap,
//   X,
// } from "lucide-react";

// export default function UserDashboard() {
//   const { user } = useAuth();

//   const [todos, setTodos] = useState([]);
//   const [task, setTask] = useState("");
//   const [dueDate, setDueDate] = useState("");
//   const [priority, setPriority] = useState("medium");
//   const [editId, setEditId] = useState(null);
//   const [filter, setFilter] = useState("all");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   const fetchTodos = async () => {
//     const res = await api.get("/todos");
//     setTodos(res.data);
//   };

//   const resetForm = () => {
//     setTask("");
//     setDueDate("");
//     setPriority("medium");
//     setEditId(null);
//   };

//   const handleAddOrUpdate = async (e) => {
//     e?.preventDefault();
//     if (!task.trim()) return;

//     setLoading(true);

//     if (editId) {
//       const res = await api.put(`/todos/${editId}`, {
//         text: task,
//         dueDate,
//         priority,
//       });

//       setTodos((prev) =>
//         prev.map((t) => (t._id === editId ? res.data : t))
//       );
//       resetForm();
//       setLoading(false);
//       return;
//     }

//     const res = await api.post("/todos", {
//       text: task,
//       dueDate,
//       priority,
//     });

//     setTodos((prev) => [res.data, ...prev]);
//     resetForm();
//     setLoading(false);
//   };

//   const toggleComplete = async (id) => {
//     const todo = todos.find((t) => t._id === id);
//     const res = await api.put(`/todos/${id}`, {
//       completed: !todo.completed,
//     });

//     setTodos((prev) =>
//       prev.map((t) => (t._id === id ? res.data : t))
//     );
//   };

//   const deleteTodo = async (id) => {
//     await api.delete(`/todos/${id}`);
//     setTodos((prev) => prev.filter((t) => t._id !== id));
//   };

//   const startEdit = (todo) => {
//     setEditId(todo._id);
//     setTask(todo.text);
//     setDueDate(todo.dueDate || "");
//     setPriority(todo.priority || "medium");
//   };

//   const filteredTodos = todos.filter((t) => {
//     if (filter === "active") return !t.completed;
//     if (filter === "completed") return t.completed;
//     return true;
//   });

//   const completedCount = todos.filter((t) => t.completed).length;
//   const activeCount = todos.filter((t) => !t.completed).length;
//   const completionRate =
//     todos.length > 0
//       ? Math.round((completedCount / todos.length) * 100)
//       : 0;

//   return (
//     <div className="min-h-screen bg-blue-100 pb-28">
//       <motion.main
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="max-w-6xl mx-auto px-6 pt-14 space-y-10"
//       >
//         {/* HEADER */}
//         <header className="space-y-4">
//           <div className="flex items-center gap-2 text-purple-700 text-sm font-bold uppercase">
//             <Sparkles size={16} /> Personal Workspace
//           </div>

//           <div className="flex justify-between items-end flex-wrap gap-4">
//             <div>
//               <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
//                 Welcome, {user?.name || "User"}
//               </h1>
//               <p className="text-slate-600 mt-2">
//                 Let's focus on what matters today ✨
//               </p>
//             </div>

//             <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-2xl shadow-lg">
//               <TrendingUp size={18} />
//               <span className="font-semibold">{completionRate}% Complete</span>
//             </div>
//           </div>
//         </header>

//         {/* STATS - Updated with colored cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           <StatCard 
//             label="Total Tasks" 
//             value={todos.length} 
//             icon={<LayoutDashboard />}
//             color="purple"
//           />
//           <StatCard 
//             label="Completed" 
//             value={completedCount} 
//             icon={<CheckCircle2 />}
//             color="green"
//           />
//           <StatCard 
//             label="In Progress" 
//             value={activeCount} 
//             icon={<Clock />}
//             color="blue"
//           />
//           <StatCard 
//             label="Success Rate" 
//             value={`${completionRate}%`} 
//             icon={<Zap />}
//             color="amber"
//           />
//         </div>

//         {/* ADD TASK - Updated with gradient background */}
//         <div className="bg-gradient-to-br from-purple-50 via-purple-50/80 to-pink-50 backdrop-blur-xl rounded-3xl shadow-xl p-8 space-y-6 border border-purple-200/50">
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold text-purple-800">Add New Task</h2>
//             <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl p-4">
//               <Plus className="text-purple-600" />
//               <input
//                 className="flex-1 bg-transparent outline-none text-lg placeholder-purple-400/70"
//                 placeholder={editId ? "Update task..." : "Add a new task..."}
//                 value={task}
//                 onChange={(e) => setTask(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleAddOrUpdate(e)}
//               />
//               {editId && (
//                 <button onClick={resetForm} className="p-2 hover:bg-red-100 rounded-xl">
//                   <X className="text-red-500" />
//                 </button>
//               )}
//             </div>

//             <div className="flex flex-col sm:flex-row gap-3">
//               <input
//                 type="date"
//                 value={dueDate}
//                 onChange={(e) => setDueDate(e.target.value)}
//                 className="px-4 py-3 rounded-xl bg-white/80 backdrop-blur-sm border border-purple-200 focus:bg-white focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
//               />

//               <select
//                 value={priority}
//                 onChange={(e) => setPriority(e.target.value)}
//                 className="px-4 py-3 rounded-xl bg-white/80 backdrop-blur-sm border border-purple-200 focus:bg-white focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
//               >
//                 <option value="low">🟢 Low</option>
//                 <option value="medium">🟡 Medium</option>
//                 <option value="high">🔴 High</option>
//               </select>

//               <button
//                 onClick={handleAddOrUpdate}
//                 disabled={loading}
//                 className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-purple-500/30"
//               >
//                 {loading ? "Saving..." : editId ? "Update Task" : "Add Task"}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* TASK LIST - Updated with gradient background */}
//         <section className="bg-gradient-to-br from-blue-50 via-blue-50/80 to-indigo-50 backdrop-blur-xl rounded-3xl shadow-xl p-8 space-y-6 border border-blue-200/50">
//           <div className="flex justify-between items-center">
//             <div className="flex bg-white/80 backdrop-blur-sm rounded-2xl p-1">
//               <FilterTab label="All" active={filter === "all"} onClick={() => setFilter("all")} />
//               <FilterTab label="Active" active={filter === "active"} onClick={() => setFilter("active")} />
//               <FilterTab label="Completed" active={filter === "completed"} onClick={() => setFilter("completed")} />
//             </div>

//             <span className="text-sm text-blue-600 font-medium bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
//               {filteredTodos.length} items
//             </span>
//           </div>

//           <AnimatePresence>
//             <div className="space-y-3">
//               {filteredTodos.map((todo) => (
//                 <motion.div
//                   key={todo._id}
//                   whileHover={{ y: -4 }}
//                   className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-blue-100"
//                 >
//                   <div className="flex justify-between">
//                     <div className="flex gap-4">
//                       <button
//                         onClick={() => toggleComplete(todo._id)}
//                         className={`w-7 h-7 rounded-xl flex items-center justify-center ${
//                           todo.completed
//                             ? "bg-gradient-to-br from-green-500 to-emerald-600"
//                             : "bg-slate-200 hover:bg-slate-300"
//                         }`}
//                       >
//                         {todo.completed && <Check size={16} className="text-white" />}
//                       </button>

//                       <div>
//                         <p className={`font-semibold ${todo.completed && "line-through text-slate-400"}`}>
//                           {todo.text}
//                         </p>

//                         <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
//                           {todo.dueDate && (
//                             <span className="flex items-center gap-1">
//                               <CalendarDays size={12} />
//                               {new Date(todo.dueDate).toLocaleDateString("en-IN")}
//                             </span>
//                           )}

//                           <span className={`px-2 py-0.5 rounded-full font-semibold ${
//                             todo.priority === "high"
//                               ? "bg-red-100 text-red-600 border border-red-200"
//                               : todo.priority === "medium"
//                               ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
//                               : "bg-green-100 text-green-600 border border-green-200"
//                           }`}>
//                             {todo.priority}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex gap-2">
//                       <button onClick={() => startEdit(todo)} className="p-2 hover:bg-blue-100 rounded-lg text-blue-600">
//                         <Pencil size={16} />
//                       </button>
//                       <button onClick={() => deleteTodo(todo._id)} className="p-2 hover:bg-red-100 rounded-lg text-red-600">
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </AnimatePresence>
//         </section>
//       </motion.main>
//     </div>
//   );
// }

// /* ---------- Updated StatCard Component ---------- */
// function StatCard({ label, value, icon, color }) {
//   const colorClasses = {
//     purple: "from-purple-500/10 to-purple-600/10 border-purple-200 text-purple-600",
//     blue: "from-blue-500/10 to-blue-600/10 border-blue-200 text-blue-600",
//     green: "from-green-500/10 to-green-600/10 border-green-200 text-green-600",
//     amber: "from-amber-500/10 to-amber-600/10 border-amber-200 text-amber-600",
//   };

//   const iconBgClasses = {
//     purple: "bg-gradient-to-br from-purple-500 to-purple-600",
//     blue: "bg-gradient-to-br from-blue-500 to-blue-600",
//     green: "bg-gradient-to-br from-green-500 to-green-600",
//     amber: "bg-gradient-to-br from-amber-500 to-amber-600",
//   };

//   return (
//     <div className={`bg-gradient-to-br ${colorClasses[color]} backdrop-blur-xl rounded-2xl shadow-lg p-6 hover:scale-105 transition border`}>
//       <div className="flex items-start justify-between">
//         <div>
//           <p className="text-xs uppercase text-slate-600 font-semibold mb-2">{label}</p>
//           <p className="text-3xl font-bold">{value}</p>
//         </div>
//         <div className={`${iconBgClasses[color]} p-3 rounded-xl text-white shadow-md`}>
//           {icon}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ---------- Updated FilterTab Component ---------- */
// function FilterTab({ label, active, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`px-5 py-2 rounded-xl text-sm font-semibold transition ${
//         active ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md" : "text-slate-600 hover:text-purple-700"
//       }`}
//     >
//       {label}
//     </button>
//   );
// }


import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import {
  Trash2,
  Pencil,
  Check,
  Plus,
  LayoutDashboard,
  CalendarDays,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Clock,
  Zap,
  X,
} from "lucide-react";

export default function UserDashboard() {
  const { user } = useAuth();

  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await api.get("/todos");
    setTodos(res.data);
  };

  const resetForm = () => {
    setTask("");
    setDueDate("");
    setPriority("medium");
    setEditId(null);
  };

  /* ✅ FIXED: Already optimistic (keeping as is) */
  const handleAddOrUpdate = async (e) => {
    e?.preventDefault();
    if (!task.trim()) return;

    setLoading(true);

    if (editId) {
      // Optimistic update for editing
      const originalTodo = todos.find(t => t._id === editId);
      const updatedTodo = {
        ...originalTodo,
        text: task,
        dueDate,
        priority,
        updatedAt: new Date().toISOString()
      };
      
      // Update UI immediately
      setTodos(prev => prev.map(t => t._id === editId ? updatedTodo : t));
      
      try {
        const res = await api.put(`/todos/${editId}`, {
          text: task,
          dueDate,
          priority,
        });
        // Update with server response
        setTodos(prev => prev.map(t => t._id === editId ? res.data : t));
      } catch (error) {
        // Revert on error
        setTodos(prev => prev.map(t => t._id === editId ? originalTodo : t));
        alert("Failed to update task");
      }
      
      resetForm();
      setLoading(false);
      return;
    }

    // For new todo - create temporary ID
    const tempId = `temp-${Date.now()}`;
    const newTodo = {
      _id: tempId,
      text: task,
      dueDate,
      priority,
      completed: false,
      user: user?._id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Optimistic add
    setTodos(prev => [newTodo, ...prev]);
    
    try {
      const res = await api.post("/todos", {
        text: task,
        dueDate,
        priority,
      });
      
      // Replace temp todo with real one from server
      setTodos(prev => prev.map(t => t._id === tempId ? res.data : t));
    } catch (error) {
      // Remove temp todo on error
      setTodos(prev => prev.filter(t => t._id !== tempId));
      alert("Failed to add task");
    }
    
    resetForm();
    setLoading(false);
  };

  /* ✅ FIXED: Now with optimistic update */
  const toggleComplete = async (id) => {
    const todo = todos.find((t) => t._id === id);
    const newCompletedStatus = !todo.completed;
    
    // Optimistic update: Update UI immediately
    setTodos(prev =>
      prev.map((t) =>
        t._id === id ? { ...t, completed: newCompletedStatus } : t
      )
    );
    
    try {
      const res = await api.put(`/todos/${id}`, {
        completed: newCompletedStatus,
      });
      
      // Update with server response (in case other fields changed)
      setTodos(prev =>
        prev.map((t) => (t._id === id ? res.data : t))
      );
    } catch (error) {
      // Revert on error
      setTodos(prev =>
        prev.map((t) =>
          t._id === id ? { ...t, completed: todo.completed } : t
        )
      );
      alert("Failed to update task status");
    }
  };

  /* ✅ Already optimistic (keeping as is with error handling) */
  const deleteTodo = async (id) => {
    const todoToDelete = todos.find(t => t._id === id);
    
    // Optimistic delete
    setTodos((prev) => prev.filter((t) => t._id !== id));
    
    try {
      await api.delete(`/todos/${id}`);
    } catch (error) {
      // Revert on error
      setTodos(prev => [...prev, todoToDelete]);
      alert("Failed to delete task");
    }
  };

  const startEdit = (todo) => {
    setEditId(todo._id);
    setTask(todo.text);
    setDueDate(todo.dueDate || "");
    setPriority(todo.priority || "medium");
  };

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = todos.filter((t) => !t.completed).length;
  const completionRate =
    todos.length > 0
      ? Math.round((completedCount / todos.length) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-blue-100 pb-28">
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-6 pt-14 space-y-10"
      >
        {/* HEADER */}
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-purple-700 text-sm font-bold uppercase">
            <Sparkles size={16} /> Personal Workspace
          </div>

          <div className="flex justify-between items-end flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Welcome, {user?.name || "User"}
              </h1>
              <p className="text-slate-600 mt-2">
                Let's focus on what matters today ✨
              </p>
            </div>

            <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-2xl shadow-lg">
              <TrendingUp size={18} />
              <span className="font-semibold">{completionRate}% Complete</span>
            </div>
          </div>
        </header>

        {/* STATS - Updated with colored cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            label="Total Tasks" 
            value={todos.length} 
            icon={<LayoutDashboard />}
            color="purple"
          />
          <StatCard 
            label="Completed" 
            value={completedCount} 
            icon={<CheckCircle2 />}
            color="green"
          />
          <StatCard 
            label="In Progress" 
            value={activeCount} 
            icon={<Clock />}
            color="blue"
          />
          <StatCard 
            label="Success Rate" 
            value={`${completionRate}%`} 
            icon={<Zap />}
            color="amber"
          />
        </div>

        {/* ADD TASK - Updated with gradient background */}
        <div className="bg-gradient-to-br from-purple-50 via-purple-50/80 to-pink-50 backdrop-blur-xl rounded-3xl shadow-xl p-8 space-y-6 border border-purple-200/50">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-purple-800">Add New Task</h2>
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl p-4">
              <Plus className="text-purple-600" />
              <input
                className="flex-1 bg-transparent outline-none text-lg placeholder-purple-400/70"
                placeholder={editId ? "Update task..." : "Add a new task..."}
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddOrUpdate(e)}
              />
              {editId && (
                <button onClick={resetForm} className="p-2 hover:bg-red-100 rounded-xl">
                  <X className="text-red-500" />
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white/80 backdrop-blur-sm border border-purple-200 focus:bg-white focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
              />

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white/80 backdrop-blur-sm border border-purple-200 focus:bg-white focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>

              <button
                onClick={handleAddOrUpdate}
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-purple-500/30"
              >
                {loading ? "Saving..." : editId ? "Update Task" : "Add Task"}
              </button>
            </div>
          </div>
        </div>

        {/* TASK LIST - Updated with gradient background */}
        <section className="bg-gradient-to-br from-blue-50 via-blue-50/80 to-indigo-50 backdrop-blur-xl rounded-3xl shadow-xl p-8 space-y-6 border border-blue-200/50">
          <div className="flex justify-between items-center">
            <div className="flex bg-white/80 backdrop-blur-sm rounded-2xl p-1">
              <FilterTab label="All" active={filter === "all"} onClick={() => setFilter("all")} />
              <FilterTab label="Active" active={filter === "active"} onClick={() => setFilter("active")} />
              <FilterTab label="Completed" active={filter === "completed"} onClick={() => setFilter("completed")} />
            </div>

            <span className="text-sm text-blue-600 font-medium bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
              {filteredTodos.length} items
            </span>
          </div>

          <AnimatePresence>
            <div className="space-y-3">
              {filteredTodos.map((todo) => (
                <motion.div
                  key={todo._id}
                  whileHover={{ y: -4 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-blue-100"
                >
                  <div className="flex justify-between">
                    <div className="flex gap-4">
                      <button
                        onClick={() => toggleComplete(todo._id)}
                        className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                          todo.completed
                            ? "bg-gradient-to-br from-green-500 to-emerald-600"
                            : "bg-slate-200 hover:bg-slate-300"
                        }`}
                      >
                        {todo.completed && <Check size={16} className="text-white" />}
                      </button>

                      <div>
                        <p className={`font-semibold ${todo.completed && "line-through text-slate-400"}`}>
                          {todo.text}
                        </p>

                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                          {todo.dueDate && (
                            <span className="flex items-center gap-1">
                              <CalendarDays size={12} />
                              {new Date(todo.dueDate).toLocaleDateString("en-IN")}
                            </span>
                          )}

                          <span className={`px-2 py-0.5 rounded-full font-semibold ${
                            todo.priority === "high"
                              ? "bg-red-100 text-red-600 border border-red-200"
                              : todo.priority === "medium"
                              ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                              : "bg-green-100 text-green-600 border border-green-200"
                          }`}>
                            {todo.priority}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button onClick={() => startEdit(todo)} className="p-2 hover:bg-blue-100 rounded-lg text-blue-600">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => deleteTodo(todo._id)} className="p-2 hover:bg-red-100 rounded-lg text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </section>
      </motion.main>
    </div>
  );
}

/* ---------- Updated StatCard Component ---------- */
function StatCard({ label, value, icon, color }) {
  const colorClasses = {
    purple: "from-purple-500/10 to-purple-600/10 border-purple-200 text-purple-600",
    blue: "from-blue-500/10 to-blue-600/10 border-blue-200 text-blue-600",
    green: "from-green-500/10 to-green-600/10 border-green-200 text-green-600",
    amber: "from-amber-500/10 to-amber-600/10 border-amber-200 text-amber-600",
  };

  const iconBgClasses = {
    purple: "bg-gradient-to-br from-purple-500 to-purple-600",
    blue: "bg-gradient-to-br from-blue-500 to-blue-600",
    green: "bg-gradient-to-br from-green-500 to-green-600",
    amber: "bg-gradient-to-br from-amber-500 to-amber-600",
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

/* ---------- Updated FilterTab Component ---------- */
function FilterTab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-xl text-sm font-semibold transition ${
        active ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md" : "text-slate-600 hover:text-purple-700"
      }`}
    >
      {label}
    </button>
  );
}