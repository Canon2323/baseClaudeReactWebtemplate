# 🎨 UI Components - shadcn/ui

Este diretório contém os componentes UI base do shadcn/ui configurados para o template.

## 📦 Componentes Incluídos

### **Button**
Componente base para botões com múltiplas variações.

```tsx
import { Button } from '@/components/ui/button';

// Variantes
<Button variant="default">Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>

// Tamanhos
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

### **Card**
Componente para cards com header, content e footer.

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>
```

## 🚀 Adicionando Novos Componentes

### **Via CLI (Recomendado)**
```bash
# Instalar componente específico
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add form
npx shadcn-ui@latest add input

# Instalar múltiplos componentes
npx shadcn-ui@latest add dialog form input select
```

### **Componentes Comuns Recomendados**
```bash
# Essenciais para formulários
npm run setup:forms  # Instala zod, react-hook-form, @hookform/resolvers
npx shadcn-ui@latest add form input label textarea select

# Essenciais para navegação
npx shadcn-ui@latest add navigation-menu dropdown-menu

# Essenciais para feedback
npx shadcn-ui@latest add alert dialog toast

# Essenciais para dados
npx shadcn-ui@latest add table badge avatar
```

## 📁 Organização de Componentes

```
src/components/
├── ui/                     # Componentes base (shadcn/ui)
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── ...
├── forms/                  # Componentes de formulário
│   ├── contact-form.tsx
│   ├── login-form.tsx
│   └── ...
├── layout/                 # Componentes de layout
│   ├── header.tsx
│   ├── footer.tsx
│   └── sidebar.tsx
└── features/               # Componentes específicos
    ├── auth/
    ├── dashboard/
    └── ...
```

## 🎯 Princípios SOLID nos Componentes

### **Single Responsibility**
Cada componente tem uma função específica e bem definida.

### **Open/Closed**
Componentes são extensíveis via props sem modificar o código base.

### **Liskov Substitution**
Todos os componentes seguem a mesma interface base do shadcn/ui.

### **Interface Segregation**
Props específicas para cada componente, sem dependências desnecessárias.

### **Dependency Inversion**
Componentes dependem de abstrações (props) não de implementações concretas.

## 🔧 Customização

### **Themes**
Modificar cores e estilos via `src/app/globals.css`:

```css
:root {
  --primary: your-primary-color;
  --secondary: your-secondary-color;
  /* ... */
}
```

### **Variantes Customizadas**
Estender componentes com novas variantes:

```tsx
// src/components/ui/button.tsx
const buttonVariants = cva(
  // base styles...
  {
    variants: {
      variant: {
        default: "...",
        outline: "...",
        // Adicionar nova variante
        gradient: "bg-gradient-to-r from-blue-500 to-purple-600 text-white",
      }
    }
  }
);
```

## 📚 Documentação Oficial

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [Class Variance Authority](https://cva.style/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)