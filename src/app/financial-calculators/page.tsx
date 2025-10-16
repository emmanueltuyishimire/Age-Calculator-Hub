
import type { Metadata } from 'next';
import { categorizedNavItems } from '@/components/layout/nav-items';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
    title: 'Financial Calculators - Loan, Investment & Savings Tools',
    description: 'Explore our free financial calculators for loans, mortgages, retirement savings, and more. Make informed decisions about your financial future with our easy-to-use tools.',
    alternates: {
        canonical: '/financial-calculators',
    },
};

export default function FinancialCalculatorsHub() {
  const financialCategories = categorizedNavItems().filter(cat => 
    [
      "Mortgage & Real Estate",
      "Auto",
      "Investment",
      "Tax & Salary",
    ].includes(cat.name)
  );

  return (
    <main className="container mx-auto px-4 py-8" role="main">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Financial Calculators</h1>
        <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
          Take control of your financial future with our suite of free planning tools. Estimate loan payments, plan for retirement, and make informed decisions to protect you and your family.
        </p>
      </div>

      <div className="space-y-16">
        {financialCategories.map(category => (
          <section key={category.name}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">{category.name}</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {category.items.map((item) => (
                <Link href={item.href} key={item.href} className="block hover:no-underline group">
                  <Card className="h-full hover:shadow-xl transition-shadow duration-300 ease-in-out group-hover:border-primary/50 group-hover:bg-card">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                <item.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                            </div>
                            <CardTitle className="text-lg">{item.label}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{item.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
