# Resumen del Reto: Predicción de Ingresos en Ad-Tech

## Visión General

El reto consiste en construir un modelo de machine learning para predecir con la mayor precisión posible los ingresos que generará cada instalación de una aplicación. Se proporciona un conjunto de datos anónimo que refleja un problema real de la industria ad-tech.

## El Problema

El principal desafío es predecir el valor de `iap_revenue_d7` (ingresos por compras en la aplicación dentro de los 7 días) para cada instalación. Sin embargo, existe una restricción crítica del mundo real: la **velocidad y la simplicidad**. Los modelos deben generar predicciones en milisegundos. Por lo tanto, una solución simple, rápida y elegante será más valorada que un modelo complejo y lento, incluso si este último es ligeramente más preciso.

## Conclusiones del Análisis de Datos

1.  **Desbalance de Datos**: La gran mayoría de las instalaciones generan ingresos nulos o muy bajos, mientras que unas pocas son extremadamente valiosas. Esto puede sesgar el entrenamiento del modelo y requiere técnicas específicas para ser manejado.
2.  **Complejidad vs. Velocidad**: Existe un trade-off fundamental entre la precisión del modelo y su tiempo de inferencia. Arquitecturas complejas como Transformers o redes neuronales profundas pueden dar mayor precisión, pero a costa de una velocidad inaceptable en un entorno de producción.
3.  **Ingeniería de Características (Feature Engineering)**: La selección, preprocesamiento y creación de características es clave. El dataset contiene tanto información del evento de instalación (dispositivo, hora) como datos históricos del comportamiento del usuario (compras pasadas, historial de anuncios). La forma en que se representen y combinen estas características (ej. embeddings, features cruzadas) impactará directamente en el rendimiento.
4.  **Diseño de la Solución**: No hay un único camino. Se puede optar por un modelo único que prediga el ingreso directamente o un enfoque de dos pasos (primero predecir si un usuario pagará y luego cuánto pagará). La elección dependerá de cómo se decida manejar el desbalance y la complejidad.
5.  **Métrica de Evaluación**: Aunque la métrica oficial es el **Error Cuadrático Medio Logarítmico (MSLE)**, un modelo que predice siempre '0' puede obtener una puntuación engañosamente buena. Por ello, los jueces valorarán también la **simplicidad, eficiencia y el diseño general** de la solución, no solo el ranking en la leaderboard.

## Planteamiento del Problema a Resolver

El objetivo es desarrollar un pipeline de machine learning completo que:

1.  **Procese eficientemente un dataset de gran tamaño** que no cabe en memoria, utilizando técnicas de procesamiento por lotes (out-of-core).
2.  **Maneje el severo desbalance** en la variable objetivo (`iap_revenue_d7`) mediante transformaciones (ej. `log(1 + revenue)`), funciones de pérdida personalizadas o un diseño de modelo específico (ej. modelo de dos pasos).
3.  **Realice una ingeniería de características inteligente** para extraer el máximo poder predictivo de los datos categóricos, temporales y de historial de usuario, sin introducir un exceso de ruido o complejidad.
4.  **Entrene un modelo predictivo** que equilibre alta precisión (medida por MSLE y otras métricas como AUC/F1 para la clasificación de compradores) con una baja latencia de inferencia.
5.  **Genere un archivo de sumisión** con las predicciones de ingresos para el conjunto de prueba en el formato especificado (`row_id,iap_revenue_d7`).

En resumen, el reto no es solo construir el modelo más preciso, sino diseñar la **solución más práctica y eficiente** para un problema real de negocio con restricciones de producción.
