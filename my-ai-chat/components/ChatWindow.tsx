import { motion, AnimatePresence } from "framer-motion";

export const ChatMessage = ({ text, isUser }: { text: string; isUser: boolean }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`p-4 rounded-lg ${isUser ? 'bg-blue-600 ml-auto' : 'bg-gray-800'}`}
  >
    {text}
  </motion.div>
);
