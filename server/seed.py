import asyncio
from app.db.session import SessionLocal
from app.models.project import Project

async def seed():
    db = SessionLocal()
    
    projects_data = [
        {
            "category": "ML / CV",
            "status": "Completed",
            "title": "Red Chili Pest Detection",
            "slug": "red-chili-pest-detection",
            "description": "Real-time crop pest classification using TensorFlow + MLflow + Docker pipeline. Trained on 4 pest categories.",
            "technologies": ["TensorFlow", "MLflow", "Docker", "FastAPI"],
            "domains": ["ML", "CV"],
            "icon": "fa-seedling",
            "outcome": "92% accuracy on test set, deployed via Docker",
            "github_url": "https://github.com/Fiyanz/red-chili-pest-detection",
            "challenge": "Encountered .ravel() mismatch errors during label encoding \u2014 traced back to inconsistent image dimensions in the raw dataset. Fixed with a preprocessing normalization step.",
            "learning": "Always validate tensor shapes before training \u2014 added shape assertion checks as a standard pipeline step."
        },
        {
            "category": "Backend",
            "status": "Completed",
            "title": "FastAPI E-commerce System",
            "slug": "fastapi-ecommerce-system",
            "description": "Full-featured REST API with JWT auth, Stripe payments, inventory management, and Redis caching.",
            "technologies": ["FastAPI", "PostgreSQL", "Redis", "Stripe"],
            "domains": ["API", "BE"],
            "icon": "fa-cart-shopping",
            "outcome": "30+ endpoints, <50ms avg response, tested with Locust",
            "github_url": "https://github.com/Fiyanz/fastapi-ecommerce-system",
            "challenge": "N+1 query issue surfaced under load testing \u2014 solved by implementing SQLAlchemy selectinload and adding a query profiler middleware.",
            "learning": "Never skip load testing before calling a backend 'done' \u2014 Locust caught 3 critical bottlenecks pre-launch."
        },
        {
            "category": "IoT",
            "status": "Ongoing",
            "title": "SightAssist ESP32-C3",
            "slug": "sightassist-esp32-c3",
            "description": "Embedded assistive device for visually impaired \u2014 ultrasonic + camera + TTS pipeline on ESP32-C3.",
            "technologies": ["ESP32-C3", "MicroPython", "MQTT", "TTS"],
            "domains": ["IoT", "ESP"],
            "icon": "fa-eye",
            "outcome": "Sensor fusion working, camera module in progress",
            "github_url": "https://github.com/Fiyanz/sightassist-esp32-c3",
            "challenge": "ESP32-C3 kept entering boot loop after flashing \u2014 traced to GPIO conflict between UART0 and the camera module. Fixed by remapping UART to GPIO 21/20.",
            "learning": "Always check the chip's IO MUX table before wiring \u2014 manufacturer docs aren't always consistent with community pinouts."
        },
        {
            "category": "ML / AI",
            "status": "Completed",
            "title": "Crop Recommendation System",
            "slug": "crop-recommendation-system",
            "description": "Agri-ML model recommending optimal crops based on soil & climate data. Built during AI/ML bootcamp.",
            "technologies": ["Scikit-learn", "Pandas", "Streamlit"],
            "domains": ["ML", "AI"],
            "icon": "fa-wheat-awn",
            "outcome": "96.4% F1-score, RandomForest best model",
            "github_url": "https://github.com/Fiyanz/crop-recommendation-system",
            "challenge": "Class imbalance in the dataset skewed predictions toward high-frequency crops. Fixed with SMOTE oversampling + stratified k-fold cross-validation.",
            "learning": "Accuracy is a vanity metric \u2014 F1 and confusion matrices tell the real story."
        },
        {
            "category": "Web3",
            "status": "Completed",
            "title": "Decentralized Voting dApp",
            "slug": "decentralized-voting-dapp",
            "description": "Smart contract-based voting system on EVM-compatible chain with transparent result tallying.",
            "technologies": ["Solidity", "Hardhat", "ethers.js", "React"],
            "domains": ["Web3", "Blockchain"],
            "icon": "fa-cube",
            "outcome": "Deployed on testnet, gas-optimized contract",
            "github_url": "https://github.com/Fiyanz/decentralized-voting-dapp",
            "challenge": "Re-entrancy vulnerability found in early draft during Slither static analysis. Refactored using Checks-Effects-Interactions pattern before any deployment.",
            "learning": "Smart contracts are immutable \u2014 audit-first mentality is non-negotiable, even for toy projects."
        },
        {
            "category": "Mobile",
            "status": "Ongoing",
            "title": "AgriTrack Mobile App",
            "slug": "agritrack-mobile-app",
            "description": "Flutter-based field companion app for farmers \u2014 integrates crop recommendation model via REST API.",
            "technologies": ["Flutter", "Dart", "FastAPI", "SQLite"],
            "domains": ["Mobile", "App"],
            "icon": "fa-mobile-screen",
            "outcome": "Auth + recommendation flow done, offline mode WIP",
            "github_url": "https://github.com/Fiyanz/agritrack-mobile-app",
            "challenge": "State management became a spaghetti mess using raw setState \u2014 migrated to Riverpod for predictable state flow, especially for async API calls.",
            "learning": "Pick your state management solution before writing business logic \u2014 retrofitting is painful."
        }
    ]

    try:
        # Clear existing
        db.query(Project).delete()
        
        for data in projects_data:
            project = Project(**data)
            db.add(project)
        
        db.commit()
        print("Successfully seeded projects data!")
    except Exception as e:
        print(f"Error seeding data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    asyncio.run(seed())
