import type { LucideProps } from 'lucide-react'

export const DepartmentIcon = {
  bazaar: (props: LucideProps) => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="bazaarIconTitle"
      {...props}
    >
      <title className="sr-only" id="bazaarIconTitle">
        Bazar
      </title>
      <path
        opacity=".2"
        d="M39 7.5v24H28.5s0-19.5 10.5-24Z"
        fill="hsl(var(--secondary))"
      />
      <path
        d="M13.5 16.5v-9a1.5 1.5 0 0 1 3 0v9a1.5 1.5 0 1 1-3 0Zm27-9V42a1.5 1.5 0 1 1-3 0v-9h-9a1.5 1.5 0 0 1-1.5-1.5c.07-3.593.524-7.168 1.354-10.665 1.834-7.592 5.31-12.68 10.055-14.713A1.5 1.5 0 0 1 40.5 7.5Zm-3 2.606C31.468 14.713 30.287 25.935 30.056 30H37.5V10.106ZM22.48 7.254a1.501 1.501 0 1 0-2.96.493L21 16.618a6 6 0 0 1-12 0l1.477-8.87a1.5 1.5 0 1 0-2.958-.494l-1.5 9c-.013.082-.02.164-.019.246a9.013 9.013 0 0 0 7.5 8.872V42a1.5 1.5 0 0 0 3 0V25.372A9.013 9.013 0 0 0 24 16.5c0-.082-.007-.165-.02-.246l-1.5-9Z"
        fill="hsl(var(--secondary))"
      />
    </svg>
  ),
  drinks: (props: LucideProps) => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="drinksIconTitle"
      {...props}
    >
      <title className="sr-only" id="drinksIconTitle">
        Bebidas
      </title>
      <path
        opacity=".2"
        d="M30 30 19.5 40.5l-12-12L18 18l12 12Z"
        fill="hsl(var(--secondary))"
      />
      <path
        d="m46.061 7.939-6-6A1.5 1.5 0 0 0 37.94 4.06l.277.276-10.344 7.759-7.166 1.434c-.29.058-.557.2-.767.409L4.313 29.56a4.5 4.5 0 0 0 0 6.364l7.762 7.763a4.5 4.5 0 0 0 6.364 0L34.06 28.066a1.5 1.5 0 0 0 .409-.767l1.434-7.166 7.76-10.345.275.278a1.502 1.502 0 0 0 2.122-2.123V7.94ZM19.5 38.379 9.62 28.5 18 20.12 27.88 30l-8.38 8.38ZM15.257 42a1.49 1.49 0 0 1-1.06-.439L6.44 33.803a1.5 1.5 0 0 1 0-2.121L7.5 30.62l9.88 9.879-1.067 1.061a1.5 1.5 0 0 1-1.056.439ZM33.3 18.6a1.482 1.482 0 0 0-.27.606l-1.412 7.055L30 27.88 20.12 18l1.619-1.618 7.055-1.412c.22-.043.427-.135.606-.27l10.96-8.22 1.16 1.16L33.3 18.6Z"
        fill="hsl(var(--secondary))"
      />
    </svg>
  ),
  candy_store: (props: LucideProps) => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="candyStoreIconTitle"
      {...props}
    >
      <title className="sr-only" id="candyStoreIconTitle">
        Bebês
      </title>
      <path
        d="M38 13c-6 0-9-1-9-7H10v36h28V13Zm0 17H10ZM10 18h28Zm14 24V6Z"
        fill="hsl(var(--secondary))"
        fillOpacity=".2"
      />
      <path
        d="M38 30H10m0-12h28M24 42V6m14 7c-6 0-9-1-9-7H10v36h28V13Z"
        stroke="hsl(var(--secondary))"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  frozen: (props: LucideProps) => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="frozenIconTitle"
      {...props}
    >
      <title className="sr-only" id="frozenIconTitle">
        Congelados
      </title>
      <path
        opacity=".2"
        d="M28.5 25.875V9a6 6 0 1 0-12 0v16.875a10.5 10.5 0 1 0 12 0ZM22.5 39a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Z"
        fill="hsl(var(--secondary))"
      />
      <path
        d="m46.67 14.572-3.75 1.217 2.314 3.188a1.502 1.502 0 0 1-.307 2.128 1.498 1.498 0 0 1-2.119-.366L40.5 17.552l-2.314 3.187a1.5 1.5 0 0 1-2.426-1.762l2.314-3.188-3.75-1.216a1.5 1.5 0 1 1 .926-2.854L39 12.938V9a1.5 1.5 0 1 1 3 0v3.938l3.75-1.217a1.5 1.5 0 1 1 .928 2.853l-.007-.002ZM28.5 34.5a6 6 0 1 1-7.5-5.813V22.5a1.5 1.5 0 1 1 3 0v6.188a6.01 6.01 0 0 1 4.5 5.812Zm-3 0a3 3 0 1 0-5.999 0 3 3 0 0 0 5.999 0Zm9 0A12 12 0 1 1 15 25.125V9a7.5 7.5 0 0 1 15 0v16.125a12.016 12.016 0 0 1 4.5 9.375Zm-3 0a9.016 9.016 0 0 0-3.859-7.387A1.5 1.5 0 0 1 27 25.875V9a4.5 4.5 0 1 0-9 0v16.875a1.501 1.501 0 0 1-.641 1.23A9 9 0 1 0 31.5 34.5Z"
        fill="hsl(var(--secondary))"
      />
    </svg>
  ),
  fridge: (props: LucideProps) => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="fridgeIconTitle"
      {...props}
    >
      <title className="sr-only" id="fridgeIconTitle">
        Frigideira
      </title>
      <path
        opacity=".2"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.1 10c6.623 0 12.6 1.13 16.8 3.07 3.554 1.615 2.261 6.622-1.938 6.784h-2.1c-3.07 0-5.977 1.13-8.239 2.908-2.908 2.261-5.977 4.361-9.53 5.492-3.232 1.13-6.947 1.292-10.34.323C5.263 26.96 3 23.247 3 19.692 3 14.362 13.338 10 26.1 10Zm-3.715 9.692c0 1.785-2.532 3.231-5.654 3.231-3.123 0-5.654-1.446-5.654-3.23 0-1.785 2.531-3.232 5.654-3.232 3.122 0 5.654 1.447 5.654 3.231Z"
        fill="hsl(var(--secondary))"
      />
      <path
        d="M42.9 13.07C38.7 11.13 32.723 10 26.1 10 13.338 10 3 14.361 3 19.692c0 3.554 2.262 7.27 7.754 8.885 3.392.97 7.107.808 10.338-.323 3.554-1.13 6.623-3.23 9.531-5.492 2.262-1.777 5.17-2.908 8.238-2.908h2.1c4.2-.162 5.493-5.17 1.939-6.785Z"
        stroke="hsl(var(--secondary))"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.73 22.923c3.123 0 5.655-1.446 5.655-3.23 0-1.785-2.532-3.232-5.654-3.232-3.123 0-5.654 1.447-5.654 3.231 0 1.785 2.531 3.231 5.654 3.231Z"
        stroke="hsl(var(--secondary))"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M45 16.462v8.076c-.161 1.616-1.615 3.231-3.877 3.231h-2.1c-3.07 0-6.138 1.131-8.238 2.908-2.908 2.423-5.977 4.361-9.531 5.492-3.393 1.131-6.946 1.293-10.339.323C5.262 35.04 3 31.323 3 27.77v-8.077"
        stroke="hsl(var(--secondary))"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity=".2"
        d="M45 24.538v-8.076s0 3.23-5.977 3.23c-3.172 0-3.715 0-7.754 2.423-1.029.618-1.9 1.34-2.803 2.088-2.636 2.184-5.527 4.58-13.35 5.182C4.615 30.192 3 19.692 3 19.692v8.077c0 3.554 2.262 7.27 7.915 8.723 3.393.97 6.947.808 10.339-.323 3.554-1.13 6.623-3.069 9.53-5.492 2.1-1.777 5.17-2.908 8.24-2.908h2.1c2.26 0 3.715-1.615 3.876-3.23Z"
        fill="hsl(var(--secondary))"
      />
    </svg>
  ),
  cold_and_dairy: (props: LucideProps) => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="coldAndDairyIconTitle"
      {...props}
    >
      <title className="sr-only" id="coldAndDairyIconTitle">
        Frios e Laticínios
      </title>
      <path
        opacity=".2"
        d="m34.5 7.5-30 9V21H6a4.5 4.5 0 0 1 4.5 4.414C10.547 27.937 8.42 30 5.899 30H4.5v6H15v-1.5a6 6 0 1 1 12 0V36h15a1.5 1.5 0 0 0 1.5-1.5v-18a9 9 0 0 0-9-9Zm-3 18a6 6 0 0 1-5.198-9h10.395a6 6 0 0 1-5.197 9Z"
        fill="hsl(var(--secondary))"
      />
      <path
        d="M34.5 6c-.146 0-.291.021-.431.064l-30 9A1.5 1.5 0 0 0 3 16.5V21a1.5 1.5 0 0 0 1.5 1.5H6a3.015 3.015 0 0 1 3 2.942 2.925 2.925 0 0 1-.859 2.12 3.162 3.162 0 0 1-2.25.947H4.5a1.5 1.5 0 0 0-1.5 1.5v6a1.5 1.5 0 0 0 1.5 1.5H42a3 3 0 0 0 3-3V16.5A10.511 10.511 0 0 0 34.5 6Zm.21 3a7.511 7.511 0 0 1 7.138 6H14.721L34.71 9ZM36 19.5a4.5 4.5 0 1 1-8.741-1.5h8.482c.171.482.259.989.259 1.5Zm-19.5 15a4.5 4.5 0 1 1 9 0h-9Zm25.5 0H28.5a7.5 7.5 0 0 0-15 0H6v-3a6.187 6.187 0 0 0 4.283-1.847A5.887 5.887 0 0 0 12 25.383 6.028 6.028 0 0 0 6 19.5V18h18.152a7.499 7.499 0 1 0 14.696 0H42v16.5Z"
        fill="hsl(var(--secondary))"
      />
    </svg>
  ),
  hygiene_and_beauty: (props: LucideProps) => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="hygieneAndBeautyIconTitle"
      {...props}
    >
      <title className="sr-only" id="hygieneAndBeautyIconTitle">
        Higiene e Beauté
      </title>
      <path
        opacity=".2"
        d="M36.727 36.727a17.943 17.943 0 0 1-5.227 3.64V28.5A1.5 1.5 0 0 0 30 27h-1.5V13.5l-9 4.5v9H18a1.5 1.5 0 0 0-1.5 1.5v11.867a18 18 0 1 1 20.227-3.64Z"
        fill="hsl(var(--secondary))"
      />
      <path
        d="M37.789 10.211A19.5 19.5 0 1 0 10.21 37.79 19.5 19.5 0 0 0 37.79 10.21ZM18 39.375V28.5h12v10.875c-3.86 1.5-8.14 1.5-12 0ZM27 25.5h-6v-6.574l6-3V25.5Zm8.666 10.166A16.496 16.496 0 0 1 33 37.832V28.5a3 3 0 0 0-3-3v-12a1.5 1.5 0 0 0-2.171-1.342l-9 4.5A1.5 1.5 0 0 0 18 18v7.5a3 3 0 0 0-3 3v9.332a16.5 16.5 0 1 1 20.666-2.166Z"
        fill="hsl(var(--secondary))"
      />
    </svg>
  ),
  hortifruti: (props: LucideProps) => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="hortifrutiIconTitle"
      {...props}
    >
      <title className="sr-only" id="hortifrutiIconTitle">
        Hortifruti
      </title>
      <path
        opacity=".2"
        d="M34.425 28.425C27 36 8.215 41.812 8.215 41.812a1.5 1.5 0 0 1-2.027-2.026S12 21 19.575 13.575a10.5 10.5 0 0 1 14.85 14.85Z"
        fill="hsl(var(--secondary))"
      />
      <path
        d="M43.5 12h-5.38l4.941-4.939A1.5 1.5 0 1 0 40.94 4.94L36 9.879V4.5a1.5 1.5 0 1 0-3 0v6.107a12 12 0 0 0-14.475 1.897C11.006 19.89 5.353 37.457 4.802 39.214A3 3 0 0 0 8.788 43.2c1.757-.551 19.346-6.212 26.713-13.727A12 12 0 0 0 37.393 15H43.5a1.5 1.5 0 1 0 0-3ZM33.352 27.375c-1.676 1.71-3.984 3.337-6.534 4.824l-4.759-4.76a1.503 1.503 0 0 0-2.448.487 1.5 1.5 0 0 0 .326 1.635l4.142 4.142c-7.663 3.973-16.185 6.641-16.313 6.68-.092.03-.181.07-.266.117.045-.084.082-.173.11-.264.055-.175 5.25-16.797 12-24.501l6.332 6.332a1.501 1.501 0 0 0 2.123-2.123l-6.281-6.279a9 9 0 0 1 11.569 13.71Z"
        fill="hsl(var(--secondary))"
      />
    </svg>
  ),
  cleaning: (props: LucideProps) => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="cleaningIconTitle"
      {...props}
    >
      <title className="sr-only" id="cleaningIconTitle">
        Limpeza
      </title>
      <path
        opacity=".2"
        d="M37.5 39.65V42a1.5 1.5 0 0 1-1.5 1.5H16.5A1.5 1.5 0 0 1 15 42V31.384a6 6 0 0 1 2.25-4.688l3-2.396a5.998 5.998 0 0 0 2.25-4.688V13.5H30a49.338 49.338 0 0 1 7.5 26.15Z"
        fill="hsl(var(--secondary))"
      />
      <path
        d="M37.5 15a1.5 1.5 0 0 0 1.5-1.5A10.511 10.511 0 0 0 28.5 3H15a3 3 0 0 0-3 3v9a4.5 4.5 0 0 1-4.5 4.5 1.5 1.5 0 1 0 0 3A7.5 7.5 0 0 0 15 15h6v4.616a4.476 4.476 0 0 1-1.688 3.514l-3 2.398a7.46 7.46 0 0 0-2.812 5.856V42a3 3 0 0 0 3 3H36a3 3 0 0 0 3-3v-2.35A50.794 50.794 0 0 0 32.625 15H37.5ZM15 6h13.5a7.515 7.515 0 0 1 7.35 6H15V6Zm21 33.65V42H16.5V31.384a4.476 4.476 0 0 1 1.688-3.514l3-2.398A7.46 7.46 0 0 0 24 19.616V15h5.16A47.786 47.786 0 0 1 36 39.65Z"
        fill="hsl(var(--secondary))"
      />
    </svg>
  ),
  breakfasts_and_desserts: (props: LucideProps) => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="breakfastsAndDessertsIconTitle"
      {...props}
    >
      <title className="sr-only" id="breakfastsAndDessertsIconTitle">
        Café da Manhã e Sobremesas
      </title>
      <path
        opacity=".2"
        d="M39 16.5v9a16.5 16.5 0 0 1-9.619 15H15.62A16.5 16.5 0 0 1 6 25.5v-9h33Z"
        fill="hsl(var(--secondary))"
      />
      <path
        d="M15 10.5v-6a1.5 1.5 0 1 1 3 0v6a1.5 1.5 0 1 1-3 0Zm7.5 1.5a1.5 1.5 0 0 0 1.5-1.5v-6a1.5 1.5 0 1 0-3 0v6a1.5 1.5 0 0 0 1.5 1.5Zm6 0a1.5 1.5 0 0 0 1.5-1.5v-6a1.5 1.5 0 1 0-3 0v6a1.5 1.5 0 0 0 1.5 1.5Zm18 10.5V24a7.5 7.5 0 0 1-7.033 7.483A18.112 18.112 0 0 1 34.404 39H39a1.5 1.5 0 1 1 0 3H6a1.5 1.5 0 1 1 0-3h4.601A18.056 18.056 0 0 1 4.5 25.5v-9A1.5 1.5 0 0 1 6 15h33a7.5 7.5 0 0 1 7.5 7.5Zm-9-4.5h-30v7.5A15.05 15.05 0 0 0 15.96 39h13.08a15.051 15.051 0 0 0 8.46-13.5V18Zm6 4.5a4.5 4.5 0 0 0-3-4.241V25.5a17.998 17.998 0 0 1-.225 2.813A4.5 4.5 0 0 0 43.5 24v-1.5Z"
        fill="hsl(var(--secondary))"
      />
    </svg>
  ),
  grocery_store: (props: LucideProps) => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="groceryStoreIconTitle"
      {...props}
    >
      <title className="sr-only" id="groceryStoreIconTitle">
        Açougue
      </title>
      <path
        opacity=".2"
        d="M42 24A18 18 0 1 1 24 6a9 9 0 0 0 9 9 9 9 0 0 0 9 9Z"
        fill="hsl(var(--secondary))"
      />
      <path
        d="M30.842 30.658a2.25 2.25 0 1 1-3.188 3.177 2.25 2.25 0 0 1 3.188-3.177Zm-15.188-1.5a2.25 2.25 0 1 0 .734-.488c-.273.113-.52.279-.73.488h-.004Zm1.688-7.312a2.25 2.25 0 1 0-.73.486 2.25 2.25 0 0 0 .73-.49v.004Zm9-.188a2.25 2.25 0 1 0-3.177 3.188 2.25 2.25 0 0 0 3.177-3.188ZM43.5 24A19.5 19.5 0 1 1 24 4.5 1.5 1.5 0 0 1 25.5 6a7.5 7.5 0 0 0 7.5 7.5 1.5 1.5 0 0 1 1.5 1.5 7.5 7.5 0 0 0 7.5 7.5 1.5 1.5 0 0 1 1.5 1.5Zm-3.058 1.386a10.524 10.524 0 0 1-8.848-8.98 10.524 10.524 0 0 1-8.98-8.848 16.5 16.5 0 1 0 17.828 17.828Z"
        fill="hsl(var(--secondary))"
      />
    </svg>
  ),
  bakery: (props: LucideProps) => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="bakeryIconTitle"
      {...props}
    >
      <title className="sr-only" id="bakeryIconTitle">
        Padaria
      </title>
      <path
        opacity=".2"
        d="M39 20.813V37.5a1.5 1.5 0 0 1-1.5 1.5H27a1.5 1.5 0 0 0 1.5-1.5V20.812A6 6 0 0 0 27 9h10.5A6 6 0 0 1 39 20.813Z"
        fill="hsl(var(--secondary))"
      />
      <path
        d="M45 15a7.5 7.5 0 0 0-7.5-7.5H9a7.5 7.5 0 0 0-3 14.372V37.5a3 3 0 0 0 3 3h28.5a3 3 0 0 0 3-3V21.872A7.512 7.512 0 0 0 45 15ZM9 22.5a1.5 1.5 0 1 0 0-3 4.5 4.5 0 1 1 0-9h18a4.5 4.5 0 1 1 0 9 1.5 1.5 0 1 0 0 3v15H9v-15Zm28.5-3a1.5 1.5 0 1 0 0 3v15H30V21.872A7.5 7.5 0 0 0 33 10.5h4.5a4.5 4.5 0 1 1 0 9Z"
        fill="hsl(var(--secondary))"
      />
    </svg>
  ),
  pet: (props: LucideProps) => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="petIconTitle"
      {...props}
    >
      <title className="sr-only" id="petIconTitle">
        Pet
      </title>
      <path
        opacity=".2"
        d="M39 22.571V34.5a6 6 0 0 1-6 6H15a6 6 0 0 1-6-6V22.571L19.5 9h9L39 22.571Z"
        fill="hsl(var(--secondary))"
      />
      <path
        d="m44.946 23.438-3.08-16.5a3.002 3.002 0 0 0-3.676-2.36l-.058.018L28.284 7.5h-8.568L9.868 4.605l-.058-.017a3 3 0 0 0-3.677 2.359l-3.079 16.49a2.957 2.957 0 0 0 1.71 3.285c.395.181.824.276 1.258.278.52 0 1.03-.14 1.478-.405V34.5A7.5 7.5 0 0 0 15 42h18a7.5 7.5 0 0 0 7.5-7.5v-7.903c.447.264.956.404 1.476.405a3.055 3.055 0 0 0 1.26-.276 2.957 2.957 0 0 0 1.71-3.288ZM6 24 9.08 7.5l7.889 2.32L6 24Zm27 15h-7.5v-2.38l2.561-2.559a1.501 1.501 0 0 0-2.122-2.122L24 33.879l-1.939-1.94a1.5 1.5 0 0 0-2.122 2.122l2.561 2.56V39H15a4.5 4.5 0 0 1-4.5-4.5V23.083L20.237 10.5h7.526L37.5 23.083V34.5A4.5 4.5 0 0 1 33 39Zm9-15L31.031 9.82 38.92 7.5 42 24Zm-22.5 2.25a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
        fill="hsl(var(--secondary))"
      />
    </svg>
  ),
}
