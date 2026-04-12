# 🤸 Mapeo de Gimnastas 2026

**Sistema digital de evaluación y detección de potencial deportivo**  
Desarrollado para el equipo docente de Gimnasia Artística — CAG & USAG

🌐 **Demo en vivo:** [mapeo-gimnastas.vercel.app](https://mapeo-gimnastas.vercel.app)

---

## ✨ Funcionalidades

- 📋 **Ficha completa por gimnasta**: datos generales, asistencia, nivel, serie técnica por aparato, condición física y predisposición competitiva
- 📱 **100% responsive**: funciona en celular, tablet y PC
- 🏅 **Niveles CAG y USAG**: E1B, E1A, E2, E3 / USAG 1B, 1A, 2 y 3
- 🎯 **Evaluación de elementos**: ✅ Adquirido / 🔄 En trabajo / ⬛ No abordado
- 📊 **Dashboard con contadores** por nivel y alumnas competitivas
- 🔍 **Filtros** por nivel, predisposición y nombre
- ⬇️ **Exportar CSV** listo para abrir en Excel con codificación UTF-8
- 💾 **Datos locales**: se guardan en el navegador (localStorage), sin necesidad de login

---

## 📱 Cómo usar

1. Abrí la app en el navegador desde cualquier dispositivo
2. Escribí tu nombre en el campo "Profesora/or"
3. Tocá **+ Agregar Gimnasta** para cargar cada alumna
4. Completá la ficha (podés guardar y seguir después)
5. Al finalizar, exportá el CSV para enviarlo a la coordinadora

---

## 🚀 Despliegue propio

Este proyecto es HTML/CSS/JS puro, sin dependencias ni build step.

### Opción 1 — Vercel (recomendado)
1. Hacé fork de este repositorio
2. Importalo en [vercel.com](https://vercel.com)
3. Deploy automático en segundos

### Opción 2 — GitHub Pages
1. Ir a Settings → Pages
2. Source: `main` branch / `/ (root)`
3. Tu URL será `https://tuusuario.github.io/mapeo-gimnastas`

---

## 🗂️ Estructura del proyecto

```
mapeo-gimnastas/
├── index.html     # Estructura HTML + modal de ficha
├── styles.css     # Diseño responsive (mobile-first)
├── app.js         # Lógica: CRUD, renderizado dual, CSV
├── data.js        # Elementos por nivel (CAG + USAG)
└── README.md
```

---

## 🎨 Niveles soportados

| Código | Sistema | Aparatos |
|--------|---------|----------|
| E1B | CAG | Salto + Suelo |
| E1A | CAG | Salto + Barras + Viga + Suelo |
| E2 | CAG | Salto + Barras + Viga + Suelo |
| E3 | CAG | Salto + Barras + Viga + Suelo |
| USAG 1B | USAG | Salto + Suelo |
| USAG 1A | USAG | Barras + Viga |
| USAG 2 | USAG | Salto + Barras + Viga + Suelo |
| USAG 3 | USAG | Salto + Barras + Viga + Suelo |

---

## 📝 Licencia

Uso interno educativo — Gimnasia Artística 2026
