import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TestimonialType } from "@/data/testimonials";
import StarRating from "./StarRating";

interface TestimonialCardProps {
  testimonial: TestimonialType;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <Card className="glass-card p-6 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      {/* Removed image as per requirement */}
      <CardHeader className="p-0 mb-2 mt-4"> {/* Adjusted margin-bottom and added margin-top */}
        <CardTitle className="text-xl font-bold gradient-text inline-block">
          {testimonial.name}
        </CardTitle>
        {testimonial.company && (
          <p className="text-sm text-muted-foreground mt-1">
            {testimonial.company}
          </p>
        )}
      </CardHeader>
      <CardContent className="flex-1 p-0 mb-4 flex flex-col items-center">
        <StarRating rating={testimonial.rating} />
        <p className="text-base text-foreground/80 mt-3">
          "{testimonial.testimonial}"
        </p>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
