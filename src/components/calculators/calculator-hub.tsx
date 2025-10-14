
"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { categorizedNavItems } from '@/components/layout/nav-items';

const faqCategories = [
  {
    category: "General Age Calculators",
    faqs: [
        { question: "What is an age calculator?", answer: "An age calculator is an online tool that determines the time elapsed from a person's date of birth to the present day or another specified date, typically showing the result in years, months, and days." },
        { question: "How does an online age calculator work?", answer: "It subtracts the birth date from the current date, accounting for variables like the number of days in each month and leap years, to compute a precise age." },
        { question: "Can I calculate my age in years, months, and days?", answer: "Yes, our calculators provide a detailed breakdown of your age in years, months, days, and often even hours, minutes, and seconds." },
        { question: "How accurate are age calculators?", answer: "Our calculators are highly accurate as they use precise time-difference algorithms that account for leap years and the varying lengths of months." },
        { question: "Can I use an age calculator without signing up?", answer: "Absolutely. All our age calculators are free to use online without any registration or sign-up required." },
        { question: "What is a chronological age calculator?", answer: "A chronological age calculator measures the exact amount of time a person has been alive, which is the standard way of expressing age." },
        { question: "How do I calculate my age by date of birth?", answer: "Simply enter your date of birth into the designated fields on our 'Age Calculator by Date of Birth' tool and click 'Calculate' to see your exact age." },
        { question: "Can I calculate someone else’s age online?", answer: "Yes, you can enter any valid date of birth to calculate the age of a friend, family member, or anyone else." },
        { question: "How do I find my age in hours or minutes?", answer: "Our detailed results include your total age expressed in various units, including total hours, minutes, and seconds." },
        { question: "Is there an age calculator for multiple people at once?", answer: "Currently, our tools are designed to calculate the age of one person at a time to ensure accuracy." },
        { question: "How is age calculated in leap years?", answer: "Our algorithm correctly includes February 29th in leap years, ensuring the total number of days and years is accurate." },
        { question: "What is the difference between chronological and biological age?", answer: "Chronological age is the time you've been alive, while biological age reflects your body's health and functional capacity, which can be influenced by lifestyle." },
        { question: "Can I calculate age in different time zones?", answer: "Our calculators are based on the standard calendar date and do not typically account for time zone differences. The calculation is based on the date provided." },
        { question: "How can I calculate age from year only?", answer: "While our tools require a full date for precision, you can manually get a rough estimate by subtracting the birth year from the current year." },
        { question: "Does your age calculator work on mobile devices?", answer: "Yes, all our calculators are fully responsive and designed to work seamlessly on desktops, tablets, and smartphones." },
        { question: "How can I calculate age using a birthday calculator?", answer: "Our 'Birthday Age Calculator' not only calculates your current age but also provides a live countdown to your next birthday." },
        { question: "Can I calculate age in real time?", answer: "Yes, many of our calculators offer a real-time feature that updates your age every second." },
        { question: "What is the fastest way to check my age online?", answer: "Using one of our online age calculators is the fastest way. Just enter your birth date and get an instant result." },
        { question: "How do I calculate age for someone born on February 29?", answer: "Our calculators correctly handle leap year birthdays, ensuring an accurate age calculation for individuals born on February 29." },
        { question: "Is there a free age calculator available online?", answer: "Yes, all the calculators on our hub are completely free to use." },
        { question: "How do I calculate age for historical dates?", answer: "You can enter any historical date of birth into our age calculator to find the age at a specific point in time." },
        { question: "Can I print my age calculation?", answer: "While there isn't a direct print button, you can easily copy the results or take a screenshot to print them." },
        { question: "How do I calculate age for pets?", answer: "We have dedicated Dog and Cat Age Calculators that convert your pet's age into human years based on their species and size." },
        { question: "What units does the age calculator support?", answer: "Our calculators display age in years, months, weeks, days, hours, minutes, and seconds." },
        { question: "How can I check my future age on a specific date?", answer: "Our main Age Calculator allows you to set a future date to calculate your age at that specific time." },
        { question: "Is your age calculator accurate for long-term projections?", answer: "Yes, the calculations are based on standard calendar rules and are accurate for both past and future dates." },
        { question: "How does an age calculator handle time differences?", answer: "The calculation is based on the full days between two dates and does not typically account for time-of-day differences unless specified." },
        { question: "Can I save my age calculation results?", answer: "Some of our calculators use local storage to remember your last entry, but we do not save your data on our servers." },
        { question: "How is age calculated differently in other cultures?", answer: "Our calculators use the Western method of age calculation. Some cultures, like in East Asia, have different traditional methods (e.g., East Asian age reckoning)." },
        { question: "Does the age calculator consider time of birth?", answer: "Our standard calculators do not factor in the time of birth for simplicity, but the real-time calculators provide a dynamic count from the date." }
    ]
  },
  {
    category: "Biological, Metabolic & Health Age",
    faqs: [
        { question: "What is a biological age calculator?", answer: "It's a tool that estimates your body's age based on lifestyle factors like diet, exercise, and stress, rather than just your chronological age." },
        { question: "How do I calculate my metabolic age?", answer: "A metabolic age calculator estimates your body's metabolic rate compared to the average for your chronological age, based on inputs like body composition and activity level." },
        { question: "Can a calculator determine gestational age?", answer: "Yes, our Gestational Age Calculator estimates the length of a pregnancy in weeks and days from the last menstrual period." },
        { question: "How accurate is a metabolic age calculator?", answer: "It provides an estimate. For a precise measurement, you would need clinical tests, but our calculator gives a good indication of your metabolic health." },
        { question: "Can biological age differ from chronological age?", answer: "Yes. A healthy lifestyle can result in a biological age that is younger than your chronological age, and vice versa." },
        { question: "How is metabolic age calculated?", answer: "It's typically calculated by comparing your Basal Metabolic Rate (BMR) to the average BMR of your chronological age group." },
        { question: "What is a healthy metabolic age?", answer: "Ideally, your metabolic age should be the same as or lower than your chronological age." },
        { question: "Can I calculate my age based on health factors?", answer: "Yes, our Biological Age Calculator is designed for this purpose, using your health and lifestyle inputs." },
        { question: "Does exercise affect biological age?", answer: "Absolutely. Regular physical activity is a key factor in lowering biological age." },
        { question: "Can diet influence metabolic age results?", answer: "Yes, a healthy diet can boost your metabolism and lower your metabolic age." },
        { question: "How often should I check my biological age?", answer: "Checking every 6 to 12 months can be a good way to track progress after making lifestyle changes." },
        { question: "Can I calculate metabolic age online for free?", answer: "Yes, we offer free tools to estimate your metabolic age." },
        { question: "What inputs do I need for a biological age calculator?", answer: "You'll typically need to provide your chronological age, diet habits, exercise frequency, sleep patterns, and stress levels." },
        { question: "How do I calculate gestational age manually?", answer: "Count the number of weeks and days from the first day of your last menstrual period (LMP) to the current date." },
        { question: "Is gestational age different from fetal age?", answer: "Yes, fetal age is the actual age of the baby (from conception), which is typically two weeks less than the gestational age." },
        { question: "Can I track pregnancy due date with a calculator?", answer: "Yes, our Due Date Calculator helps you estimate your baby's arrival date." },
        { question: "How can ovulation calculators help plan pregnancy?", answer: "They help identify your most fertile days, increasing the chances of conception." },
        { question: "Can I calculate ovulation for irregular cycles?", answer: "It's more challenging, but possible if you know your longest and shortest cycle lengths. Our calculator provides guidance on this." },
        { question: "How is TDEE related to metabolic age?", answer: "Total Daily Energy Expenditure (TDEE) is related but different. Metabolic age focuses on your BMR, while TDEE includes all calories you burn in a day." },
        { question: "Can protein intake affect metabolic age?", answer: "Yes, higher protein intake can boost your metabolism and potentially lower your metabolic age." },
        { question: "Is BMI related to biological age?", answer: "Yes, a healthy Body Mass Index (BMI) is often associated with a lower biological age." },
        { question: "How do I improve metabolic age results?", answer: "Increase muscle mass through strength training, eat a balanced diet, and stay hydrated." },
        { question: "Can lifestyle changes reduce biological age?", answer: "Yes, improvements in diet, exercise, sleep, and stress management can significantly lower your biological age." },
        { question: "What is considered a normal biological age?", answer: "A biological age that is equal to or younger than your chronological age is considered good." },
        { question: "How is basal metabolic rate used in calculators?", answer: "BMR is a key component in calculating metabolic age, as it measures your resting energy expenditure." },
        { question: "Can stress affect metabolic age?", answer: "Yes, chronic stress can negatively impact metabolism and increase your metabolic age." },
        { question: "Are there calculators for body fat and age?", answer: "While we don't have a dedicated one, body fat percentage is a key factor in both biological and metabolic age calculations." },
        { question: "How does body composition influence biological age?", answer: "Higher muscle mass and lower body fat are generally linked to a lower biological age." },
        { question: "Is metabolic age calculator suitable for seniors?", answer: "Yes, it can be a useful tool for seniors to monitor their metabolic health." },
        { question: "Can I track progress using multiple health calculators?", answer: "Yes, using our suite of health calculators can give you a holistic view of your health progress over time." }
    ]
  },
  {
    category: "Birthday & Retirement Age Calculators",
    faqs: [
        { question: "What is a birthday age calculator?", answer: "A birthday age calculator not only tells you your exact age but also counts down to your next birthday." },
        { question: "How do I calculate my retirement age?", answer: "Our Retirement Age Calculator uses your date of birth to determine your full retirement age based on Social Security guidelines." },
        { question: "Can I calculate Social Security retirement age online?", answer: "Yes, our Social Security Retirement Age Calculator is specifically designed for this purpose." },
        { question: "How accurate is a retirement age calculator?", answer: "It is highly accurate as it's based on the official regulations provided by the Social Security Administration." },
        { question: "Can I plan early retirement using a calculator?", answer: "Yes, the results will show you the implications of retiring early, including potential benefit reductions." },
        { question: "How do I calculate age at retirement by year?", answer: "Simply input your birth year, and the calculator will provide your full retirement age." },
        { question: "Can retirement calculators account for inflation?", answer: "Our current tools focus on retirement age, not financial projections. For inflation-adjusted planning, a financial advisor is recommended." },
        { question: "What is adjusted age in retirement planning?", answer: "Adjusted age isn't a standard term in this context. Our calculators focus on the chronological age for retirement eligibility." },
        { question: "How do I calculate age at Social Security eligibility?", answer: "The earliest eligibility for Social Security retirement benefits is 62. Our calculator shows your full retirement age, which differs." },
        { question: "Can I plan retirement based on my birthday?", answer: "Yes, using your exact date of birth provides the most accurate retirement timeline." },
        { question: "Is there a retirement age calculator for multiple scenarios?", answer: "Our tool shows you the scenarios for early, full, and delayed retirement." },
        { question: "Can retirement calculators factor in part-time work?", answer: "Our calculator determines your eligibility age, not the benefit amount, which can be affected by work." },
        { question: "How can I use a retirement calculator for planning finances?", answer: "By knowing your retirement age, you can better structure your savings and investment timeline." },
        { question: "Does age calculator support future retirement dates?", answer: "Yes, it calculates the date you will reach your specific retirement age." },
        { question: "Can I calculate retirement age based on contribution years?", answer: "Social Security retirement age is based on birth year, not contribution years, although contributions affect the benefit amount." },
        { question: "How do I calculate early retirement eligibility?", answer: "You are eligible for early Social Security retirement benefits at age 62." },
        { question: "Are retirement calculators country-specific?", answer: "Yes, our retirement calculators are based on the rules for the United States." },
        { question: "Can I compare retirement plans using the calculator?", answer: "The calculator is designed to show you age eligibility under Social Security, not to compare different private plans." },
        { question: "How do I factor pension in retirement age calculation?", answer: "Our calculator focuses on Social Security. You would need to consult your pension plan documents for its specific rules." },
        { question: "Can I calculate age at retirement for spouse?", answer: "Yes, you can enter your spouse's date of birth to calculate their retirement age." },
        { question: "How do I use birthday calculator to plan parties?", answer: "The countdown feature is perfect for knowing exactly how much time you have to plan a celebration." },
        { question: "Can birthday calculators help plan age milestones?", answer: "Yes, you can use it to track significant milestones like turning 10,000 days old." },
        { question: "Is birthday calculator accurate for all time zones?", answer: "It operates based on your device's local time, so the countdown is accurate for your location." },
        { question: "How do I calculate age for children?", answer: "Our age calculators work for people of all ages, including children." },
        { question: "Can birthday calculators show age in days?", answer: "Yes, our detailed results break down your age into total days, hours, minutes, and more." },
        { question: "Can I get alerts for age milestones?", answer: "Our tools don't currently offer alerts, but you can check back anytime to track your age milestones." },
        { question: "How do I integrate age calculations with calendars?", answer: "While we don't have a direct integration, you can manually add the calculated milestone dates to your personal calendar." },
        { question: "Can birthday calculators consider leap years?", answer: "Yes, all our calculators accurately account for leap years." },
        { question: "Are birthday calculators free to use online?", answer: "Yes, they are completely free." },
        { question: "How do I combine birthday calculator with retirement planning?", answer: "Use the birthday calculator to track your current age and the retirement calculator to see how many years you have until retirement." }
    ]
  },
  {
    category: "Pet Age Calculators",
    faqs: [
        { question: "How do I calculate my cat’s age in human years?", answer: "Use our Cat Age Calculator. Just enter your cat's age, and it will convert it to the equivalent human years." },
        { question: "How do I calculate my dog’s age in human years?", answer: "Our Dog Age Calculator provides an accurate conversion based on your dog's age and breed size." },
        { question: "Are pet age calculators accurate?", answer: "They provide a good estimate based on veterinary research, which is much more accurate than the old '1 year = 7 years' rule." },
        { question: "Do different dog breeds age differently?", answer: "Yes, larger breeds tend to age faster than smaller breeds. Our calculator accounts for this." },
        { question: "How can I use cat age calculator for kittens?", answer: "The calculator is adjusted for the rapid growth of kittens in their first year." },
        { question: "Can I calculate senior pet age?", answer: "Yes, the calculators work for pets of all ages and will indicate when your pet is considered a senior." },
        { question: "Is pet age calculator useful for veterinarians?", answer: "While vets have their own detailed methods, our tool can be a helpful guide for pet owners." },
        { question: "Can pet age calculator include breed differences?", answer: "Our dog age calculator accounts for size, which is the primary factor in aging differences among breeds." },
        { question: "How do I track pet age over time?", answer: "You can use the calculator periodically to see how your pet's equivalent human age is progressing." },
        { question: "Does pet calculator show life expectancy?", answer: "Our calculators focus on converting current age, not predicting life expectancy." },
        { question: "Can I compare dog and cat ages with humans?", answer: "Yes, that's the primary purpose of our pet age calculators." },
        { question: "How is pet age calculated from birthdate?", answer: "If you know the birthdate, you can calculate the pet's chronological age in years and months and then input that into the calculator." },
        { question: "Can I calculate age for adopted pets?", answer: "Yes, if you have an estimated age from a vet, you can use that as the input." },
        { question: "Is it possible to adjust pet age calculator for exotic pets?", answer: "Our current tools are designed for dogs and cats only." },
        { question: "Can I save pet age calculations?", answer: "The calculator may remember your last entry on your device, but results are not saved on our servers." },
        { question: "How accurate is a dog age calculator for large breeds?", answer: "It's quite accurate, as it uses a formula that specifically accounts for the faster aging of large breeds." },
        { question: "How do I calculate puppy age in months?", answer: "You can use our Dog Age Calculator for puppies, as it factors in their rapid initial development." },
        { question: "Can cat age calculator predict senior care needs?", answer: "It can tell you when your cat enters its senior life stage, which is a signal to consult your vet about senior care." },
        { question: "Are pet age calculators free online?", answer: "Yes, they are completely free to use." },
        { question: "How do I use pet age calculators for multiple pets?", answer: "You can use the calculator separately for each of your pets by entering their individual ages." }
    ]
  },
  {
    category: "Miscellaneous Age & Online Tools",
    faqs: [
        { question: "Can I calculate age for historical figures?", answer: "Yes, you can set both the date of birth and the 'age at date of' to any past dates." },
        { question: "Is there an age calculator for future dates?", answer: "Yes, our main Age Calculator lets you calculate what your age will be on any future date." },
        { question: "Can I use your age calculator offline?", answer: "No, our tools require an internet connection to be accessed." },
        { question: "How do I calculate age in hours, minutes, and seconds?", answer: "Most of our age calculators provide this detailed breakdown in the results." },
        { question: "Are your age calculators mobile-friendly?", answer: "Yes, the entire website is designed to be fully responsive and easy to use on any device." },
        { question: "Can I integrate age calculator into my website?", answer: "We do not offer a widget for direct integration at this time, but you can link to our tools." },
        { question: "Do age calculators support multiple languages?", answer: "Currently, our website is available in English only." },
        { question: "How do I calculate age across different time zones?", answer: "The calculators are based on calendar dates. For precise, to-the-second calculations, it would use your device's current time zone." },
        { question: "Can age calculators factor in daylight saving time?", answer: "Our calculators do not adjust for daylight saving time shifts." },
        { question: "How do I estimate age for legal purposes?", answer: "Our calculators provide a precise chronological age, which is what is required for most legal purposes." },
        { question: "Can I calculate age for school or work requirements?", answer: "Yes, our tools are perfect for verifying age eligibility for school or employment." },
        { question: "How do I calculate combined age for multiple people?", answer: "You would need to calculate each person's age individually and then sum the results." },
        { question: "Can age calculators help plan birthdays?", answer: "Absolutely. Our Birthday Age Calculator includes a countdown to help with planning." },
        { question: "Can I share age calculation results?", answer: "You can easily copy the text or take a screenshot of your results to share them." },
        { question: "How do I calculate my age for insurance purposes?", answer: "Your chronological age, as calculated by our tool, is what insurance companies typically use." },
        { question: "Can calculators factor in leap seconds?", answer: "No, our calculators do not account for leap seconds, as they are not part of the standard civil calendar." },
        { question: "How do I calculate age for medical records?", answer: "Our tool provides the accurate chronological age needed for medical records." },
        { question: "Can I use age calculator for genealogy research?", answer: "Yes, it can be a useful tool for quickly calculating the age of ancestors at different points in history." },
        { question: "How do I calculate age in decimals?", answer: "Our calculators do not currently display age in a decimal format." },
        { question: "Can I use the calculator for employment eligibility?", answer: "Yes, it provides the accurate age information needed to verify employment eligibility." },
        { question: "How do I calculate remaining days to birthday?", answer: "Our Birthday Age Calculator has a feature that shows the remaining days, hours, and minutes until your next birthday." },
        { question: "Can I track age milestones for children?", answer: "Yes, you can use our calculators to find out when your child will be a certain number of days, weeks, or months old." },
        { question: "How do I calculate exact months and days of age?", answer: "The results of our age calculators are broken down into years, months, and days for precision." },
        { question: "Can I calculate retirement age with early contributions?", answer: "Retirement age is based on birth year, not contribution history. You can use the calculator to find the age, but not the benefit amount." },
        { question: "How do I compare age differences between people?", answer: "You can use our 'Age at the Date of' feature to find the interval between two people's birth dates." },
        { question: "Can age calculators include upcoming birthdays?", answer: "Our Birthday Age Calculator is designed specifically for this, showing a countdown to your next birthday." },
        { question: "How do I calculate age for school enrollment?", answer: "Simply enter the child's date of birth and the school's cut-off date in our Age Calculator to determine eligibility." },
        { question: "Can I calculate my zodiac sign with age calculator?", answer: "Our calculators do not determine zodiac signs, but knowing the date of birth allows you to find it easily." },
        { question: "Can calculators track historical life expectancy?", answer: "Our tools do not include historical life expectancy data." },
        { question: "How can I calculate age for senior citizen benefits?", answer: "You can use our calculators to verify you have reached the eligibility age for senior benefits." },
        { question: "Can I calculate age with partial months?", answer: "Our calculators provide a breakdown in years, months, and days, which accounts for partial months." },
        { question: "How do I calculate pet age for veterinary purposes?", answer: "Our pet age calculators give you a good estimate to discuss with your vet, especially regarding life stage and associated health needs." },
        { question: "Can I calculate ovulation dates using age calculators?", answer: "No, but we have a dedicated Ovulation Calculator for that purpose." },
        { question: "How do I calculate gestational weeks accurately?", answer: "Our Gestational Age Calculator provides an accurate estimate based on your last menstrual period." },
        { question: "Can age calculators help plan pregnancy milestones?", answer: "Yes, our pregnancy-related calculators are perfect for tracking milestones like trimesters and the due date." },
        { question: "How do I calculate age for sports eligibility?", answer: "Use our Age Calculator to confirm if an athlete meets the age requirements for a particular sports league." },
        { question: "Can I embed age calculators in blogs?", answer: "We don't offer an embeddable widget, but you are welcome to link to our tools from your blog." },
        { question: "Are your calculators fast and responsive?", answer: "Yes, they are optimized for speed and to work well on all devices." },
        { question: "How do I navigate between different age calculators?", answer: "You can use the main navigation menu at the top of the page to easily switch between calculators." },
        { question: "Can I calculate multiple age types in one tool?", answer: "We have separate, specialized tools for each type of age calculation to ensure accuracy and provide detailed, relevant information." }
    ]
  }
];

export default function CalculatorHub() {
  const categories = categorizedNavItems();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Age Calculators Hub</h1>
         <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Welcome to Age Calculators Hub, your ultimate online destination for accurate and easy-to-use age calculators.
        </p>
      </div>

       <div className="my-8 text-center" role="advertisement" aria-label="Advertisement">
            <div className="ad-slot border-dashed border-2 p-10 text-center h-[100px] sm:h-[120px] md:h-[150px] flex items-center justify-center">
                <span className="text-muted-foreground">Advertisement</span>
            </div>
        </div>

      {categories.map((category, index) => (
        <React.Fragment key={category.name}>
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">{category.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.items.map((item) => (
              <Link href={item.href} key={item.href} className="block hover:no-underline">
                <Card className="h-full hover:shadow-lg transition-shadow duration-200 ease-in-out">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                        <item.icon className="h-8 w-8 text-primary" aria-hidden="true" />
                        <CardTitle className="text-lg">{item.label}</CardTitle>
                    </div>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>
        {index === Math.floor(categories.length / 2) - 1 && (
             <div className="my-8 text-center" role="advertisement" aria-label="Advertisement">
                <div className="ad-slot border-dashed border-2 p-10 text-center h-[100px] sm:h-[120px] md:h-[150px] flex items-center justify-center">
                    <span className="text-muted-foreground">Advertisement</span>
                </div>
            </div>
        )}
        </React.Fragment>
      ))}

      <section className="mt-12 space-y-8 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Your Comprehensive Age Calculation Resource</h2>
        <p className="text-muted-foreground text-center">
            Whether you want to determine your chronological age, track your biological or metabolic age, plan for retirement with our Social Security Retirement Age Calculator, or even discover your pet’s age in human years, we have the right tool for you.
        </p>
         <p className="text-muted-foreground text-center">
            Explore our comprehensive collection of online age calculators, including birthday age calculators, age calculators by date of birth or year, gestational age calculators, and more. Our calculators are designed to provide real-time results in years, months, days, hours, minutes, and seconds, ensuring you get precise insights whenever you need them.
        </p>
         <p className="text-muted-foreground text-center">
            Stay informed and plan ahead with our professional tips, FAQs, and examples integrated into every tool. With fast, reliable, and responsive calculators, Age Calculators Hub makes it simple to understand and track age for yourself, your family, or your furry friends. Start calculating now and see how age truly measures up!
        </p>
      </section>

      <section className="mt-12 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
            {faqCategories.map((cat) => (
                <AccordionItem value={cat.category} key={cat.category}>
                    <AccordionTrigger className="text-xl">{cat.category}</AccordionTrigger>
                    <AccordionContent>
                        <Accordion type="single" collapsible className="w-full pl-4">
                            {cat.faqs.map((faq, index) => (
                                <AccordionItem value={`${cat.category}-faq-${index}`} key={index}>
                                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-muted-foreground">{faq.answer}</p>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </section>
    </div>
  );
}

    