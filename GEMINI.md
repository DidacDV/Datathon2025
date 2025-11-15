# GEMINI.md: Project Overview and Guide

This document provides a comprehensive overview of the project, its goals, and how to get started. It is intended to be a living document that is updated as the project evolves.

## Project Overview

This project is a machine learning challenge focused on predicting ad-tech revenue from app installations. The primary goal is to build a model that accurately predicts the `iap_revenue_d7` (in-app purchase revenue within 7 days) for each installation.

A key constraint of this challenge is the need for **speed and simplicity**. Models must have a low inference time (milliseconds) to be viable in a real-world production environment. Therefore, a simple, fast, and elegant solution is highly valued, even if it is slightly less accurate than a more complex model.

The main evaluation metric is the **Mean Squared Logarithmic Error (MSLE)**. However, due to the highly imbalanced nature of the data (most installations generate no revenue), the simplicity, efficiency, and overall design of the solution will also be major factors in the final evaluation.

## Key Files and Directories

*   `Reto.md`: The main challenge description (in Spanish).
*   `data.txt`: A more detailed version of the challenge description, with hints and tips for getting started.
*   `Codigos/`: This directory is intended to hold the source code for the project.
    *   `Codigos/Jupiter/Mango.ipynb`: A Jupyter notebook for developing the model. It is currently empty.
*   `DataSets/`: This directory is intended to hold the datasets for the project. It is currently empty.

## Getting Started

1.  **Explore the Data:** The first step is to obtain the dataset and place it in the `DataSets/` directory. The data is not included in this repository.
2.  **Develop Your Model:** The `Codigos/Jupiter/Mango.ipynb` notebook is a good place to start developing your model.
3.  **Out-of-Core Processing:** The dataset is expected to be large and may not fit into memory. Consider using libraries like [Dask](https://www.dask.org/) for out-of-core processing. Here's an example snippet from `data.txt`:

    ```python
    import dask
    import dask.dataframe as dd

    # When dask uses pandas 2.0.0+ it casts object columns to string automatically ([("i", 0.48)] -> '[("i", 0.48)]')
    dask.config.set({"dataframe.convert-string": False})

    dataset_path = "path/to/dataset"
    filters = [("datetime", ">=", "2025-10-01-00-00"), ("datetime", "<", "2025-10-13-00-00")]

    ddf = dd.read_parquet(
        dataset_path,
        filters=filters
    )
    ```

## Development Conventions

*   **Simplicity and Speed:** As mentioned, model simplicity and inference speed are critical. Avoid overly complex architectures that are slow to train and use for inference.
*   **Feature Engineering:** Smart feature engineering is key. The data includes request features (device, time) and user behavioral information.
*   **Handling Imbalanced Data:** The target variable (`iap_revenue_d7`) is highly imbalanced. Consider techniques like:
    *   Applying a `log(1 + revenue)` transformation.
    *   Using a two-step model (predicting if a user will pay, then how much).
    *   Choosing an appropriate loss function.
