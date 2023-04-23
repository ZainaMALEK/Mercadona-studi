using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class Promotion
    {
        public int PromotionID { get; set; }
        public DateTime Debut { get; set; }
        public DateTime Fin { get; set; }
        public float Remise { get; set; }
    }
}
