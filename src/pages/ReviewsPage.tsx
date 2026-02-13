import { mockRatings } from "@/lib/mock-data";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Reviews</h1>
        <p className="text-sm text-muted-foreground">Ratings and feedback from jobs</p>
      </div>

      <div className="space-y-3">
        {mockRatings.map((rating, i) => (
          <motion.div
            key={rating.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-5"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm font-semibold text-foreground">{rating.worker_name}</p>
                <p className="text-xs text-muted-foreground">by {rating.customer_name} • {rating.created_at}</p>
              </div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`h-4 w-4 ${j < rating.rating ? "text-warning fill-warning" : "text-muted"}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{rating.feedback}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
