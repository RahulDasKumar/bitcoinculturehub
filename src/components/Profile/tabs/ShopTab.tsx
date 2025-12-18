import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Lock, Package, Plus, ShoppingCart } from "lucide-react";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  stock: 'in_stock' | 'low_stock' | 'sold_out' | 'pre_order';
  visibility: 'public' | 'members_only';
  tags: string[];
  sales: number;
}

const products: Product[] = [
  {
    id: '1',
    title: 'Bitcoin Artist Starter Pack',
    description: 'Digital download bundle: color palettes, icon sets, and design templates for Bitcoin-themed artwork.',
    price: 50000,
    image: 'https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=800&h=600&fit=crop',
    stock: 'in_stock',
    visibility: 'public',
    tags: ['Digital', 'Design', 'Resources'],
    sales: 47
  },
  {
    id: '2',
    title: 'Limited Edition Print: "Sound Money"',
    description: 'Hand-signed 18"×24" fine art print. Edition of 21. Shipped with certificate of authenticity.',
    price: 210000,
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&h=600&fit=crop',
    stock: 'low_stock',
    visibility: 'public',
    tags: ['Print', 'Art', 'Limited Edition'],
    sales: 17
  },
  {
    id: '3',
    title: '🔒 Members-Only: Workshop Recording Bundle',
    description: 'Full recordings + materials from all 2024 workshops. Design, storytelling, and Bitcoin education.',
    price: 100000,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    stock: 'in_stock',
    visibility: 'members_only',
    tags: ['Digital', 'Education', 'Exclusive'],
    sales: 32
  },
  {
    id: '4',
    title: 'BCH Conference Ticket',
    description: 'Full access pass to Bitcoin Culture Hub Summit 2025. Includes workshops, talks, and networking events.',
    price: 500000,
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop',
    stock: 'in_stock',
    visibility: 'public',
    tags: ['Event', 'Ticket', 'Conference'],
    sales: 89
  },
  {
    id: '5',
    title: 'Custom Commission Slot',
    description: 'One custom artwork piece. Poster, album art, logo, or illustration. 2-week turnaround.',
    price: 300000,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=600&fit=crop',
    stock: 'low_stock',
    visibility: 'public',
    tags: ['Commission', 'Custom', 'Art'],
    sales: 8
  },
  {
    id: '6',
    title: 'Bitcoin Classroom Kit',
    description: 'Everything needed to teach Bitcoin to students: lesson plans, slides, activities, and handouts. Used by 50+ educators.',
    price: 75000,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
    stock: 'in_stock',
    visibility: 'public',
    tags: ['Education', 'Digital', 'Teaching'],
    sales: 124
  }
];

const stockConfig = {
  in_stock: { label: 'In Stock', color: 'text-green-400' },
  low_stock: { label: 'Low Stock', color: 'text-yellow-400' },
  sold_out: { label: 'Sold Out', color: 'text-red-400' },
  pre_order: { label: 'Pre-Order', color: 'text-blue-soft' }
};

const ProductCard = ({ product }: { product: Product }) => (
  <Card className="overflow-hidden bg-surface border-border hover:border-bitcoin-orange transition-all group">
    <div className="relative h-48 overflow-hidden">
      <img 
        src={product.image} 
        alt={product.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
      
      {/* Badges */}
      <div className="absolute top-3 right-3 flex flex-col gap-2">
        {product.visibility === 'members_only' && (
          <Badge className="bg-bitcoin-orange/90 text-primary-foreground gap-1 backdrop-blur-sm">
            <Lock className="w-3 h-3" />
            Members Only
          </Badge>
        )}
        <Badge className={`${stockConfig[product.stock].color} bg-background/90 backdrop-blur-sm`}>
          {stockConfig[product.stock].label}
        </Badge>
      </div>
    </div>
    
    <div className="p-5 space-y-4">
      {/* Header */}
      <div className="space-y-2">
        <h3 className="font-bold text-lg text-foreground group-hover:text-bitcoin-orange transition-colors line-clamp-2">
          {product.title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {product.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Price & Stats */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-xl font-bold text-bitcoin-orange">
            <Zap className="w-5 h-5" />
            {product.price.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">{product.sales} sales</p>
        </div>
        
        <Button 
          className="gap-2"
          disabled={product.stock === 'sold_out'}
        >
          {product.stock === 'sold_out' ? (
            'Sold Out'
          ) : product.stock === 'pre_order' ? (
            'Pre-Order'
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Buy
            </>
          )}
        </Button>
      </div>
    </div>
  </Card>
);

export const ShopTab = () => {
  const totalSales = products.reduce((sum, p) => sum + p.sales, 0);
  const totalRevenue = products.reduce((sum, p) => sum + (p.price * p.sales), 0);

  return (
    <div className="space-y-6">
      {/* Shop Stats */}
      <Card className="p-6 bg-surface border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Products</p>
            <p className="text-2xl font-bold text-foreground">{products.length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Sales</p>
            <p className="text-2xl font-bold text-foreground">{totalSales}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Revenue</p>
            <div className="flex items-center gap-1.5 text-2xl font-bold text-bitcoin-orange">
              <Zap className="w-5 h-5" />
              {(totalRevenue / 1000).toFixed(0)}k
            </div>
          </div>
          <div className="flex items-center">
            <Button className="gap-2 w-full">
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </div>
        </div>
      </Card>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty State for when owner has no products */}
      {products.length === 0 && (
        <Card className="p-12 bg-surface border-border border-dashed">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-bitcoin-orange/20 flex items-center justify-center mx-auto">
              <Package className="w-8 h-8 text-bitcoin-orange" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">No products yet</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Start selling your work, services, or digital products. Add your first item to get started.
              </p>
            </div>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Your First Product
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
