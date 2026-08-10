import asyncio
from app.db.session import SessionLocal
from app.models.project import Project
from app.models.skill import Skill
from app.models.experience import Experience
from app.models.user import User
from app.models.profile import Profile
from app.core.security import get_password_hash

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

    skills_data = [
        {"category": "Languages", "name": "Python", "level": 95, "is_primary": True, "display_order": 1},
        {"category": "Languages", "name": "TypeScript", "level": 75, "display_order": 2},
        {"category": "Languages", "name": "Go", "level": 80, "is_primary": True, "display_order": 3},
        {"category": "Languages", "name": "Dart", "level": 65, "display_order": 4},
        {"category": "Languages", "name": "Solidity", "level": 55, "display_order": 5},
        {"category": "Languages", "name": "C / C++", "level": 60, "display_order": 6},
        {"category": "Languages", "name": "MicroPython", "level": 70, "display_order": 7},
        {"category": "Languages", "name": "Bash", "level": 65, "display_order": 8},

        {"category": "ML / Data", "name": "TensorFlow", "level": 90, "is_primary": True, "display_order": 1},
        {"category": "ML / Data", "name": "PyTorch", "level": 70, "display_order": 2},
        {"category": "ML / Data", "name": "Scikit-learn", "level": 85, "is_primary": True, "display_order": 3},
        {"category": "ML / Data", "name": "MLflow", "level": 75, "display_order": 4},
        {"category": "ML / Data", "name": "Pandas", "level": 85, "display_order": 5},
        {"category": "ML / Data", "name": "NumPy", "level": 85, "display_order": 6},
        {"category": "ML / Data", "name": "OpenCV", "level": 70, "display_order": 7},
        {"category": "ML / Data", "name": "Streamlit", "level": 65, "display_order": 8},

        {"category": "Backend / Infra", "name": "FastAPI", "level": 92, "is_primary": True, "display_order": 1},
        {"category": "Backend / Infra", "name": "PostgreSQL", "level": 85, "display_order": 2},
        {"category": "Backend / Infra", "name": "Redis", "level": 75, "display_order": 3},
        {"category": "Backend / Infra", "name": "Docker", "level": 85, "is_primary": True, "display_order": 4},
        {"category": "Backend / Infra", "name": "Nginx", "level": 70, "display_order": 5},
        {"category": "Backend / Infra", "name": "SQLAlchemy", "level": 85, "display_order": 6},
        {"category": "Backend / Infra", "name": "RabbitMQ", "level": 60, "display_order": 7},
        {"category": "Backend / Infra", "name": "Celery", "level": 60, "display_order": 8},

        {"category": "IoT / Embedded", "name": "ESP32-C3", "level": 80, "is_primary": True, "display_order": 1},
        {"category": "IoT / Embedded", "name": "MQTT", "level": 78, "is_primary": True, "display_order": 2},
        {"category": "IoT / Embedded", "name": "I2C / SPI", "level": 65, "display_order": 3},
        {"category": "IoT / Embedded", "name": "FreeRTOS", "level": 55, "display_order": 4},
        {"category": "IoT / Embedded", "name": "Arduino", "level": 70, "display_order": 5},
        {"category": "IoT / Embedded", "name": "Raspberry Pi", "level": 65, "display_order": 6},

        {"category": "Mobile / Web3", "name": "Flutter", "level": 65, "is_primary": True, "display_order": 1},
        {"category": "Mobile / Web3", "name": "Riverpod", "level": 55, "display_order": 2},
        {"category": "Mobile / Web3", "name": "Solidity", "level": 58, "display_order": 3},
        {"category": "Mobile / Web3", "name": "Hardhat", "level": 60, "is_primary": True, "display_order": 4},
        {"category": "Mobile / Web3", "name": "ethers.js", "level": 55, "display_order": 5},
        {"category": "Mobile / Web3", "name": "IPFS", "level": 40, "display_order": 6},

        {"category": "Tooling / OS", "name": "Arch Linux", "level": 90, "is_primary": True, "display_order": 1},
        {"category": "Tooling / OS", "name": "Hyprland", "level": 85, "is_primary": True, "display_order": 2},
        {"category": "Tooling / OS", "name": "Kitty", "level": 80, "display_order": 3},
        {"category": "Tooling / OS", "name": "Neovim", "level": 85, "display_order": 4},
        {"category": "Tooling / OS", "name": "Git", "level": 90, "display_order": 5},
        {"category": "Tooling / OS", "name": "GitHub Actions", "level": 70, "display_order": 6},
        {"category": "Tooling / OS", "name": "Postman", "level": 75, "display_order": 7},
        {"category": "Tooling / OS", "name": "Locust", "level": 65, "display_order": 8},
    ]

    experiences_data = [
        {
            "type": "education", "status": "Current", "time_range": "2022 – Present",
            "institution": "Universitas [Name] · Bandung", "title": "S1 Computer Science",
            "description": "Currently pursuing a bachelor's degree in Computer Science.",
            "icon": "fa-graduation-cap", "icon_bg": "bg-gray-900", "display_order": 1
        },
        {
            "type": "bootcamp", "status": "Completed", "time_range": "2024",
            "institution": "Independent Program · Remote", "title": "AI/ML Bootcamp — Agrikultur",
            "description": "Intensive bootcamp focusing on applied ML in agriculture.",
            "icon": "fa-brain", "icon_bg": "bg-gray-700", "display_order": 2
        },
        {
            "type": "program", "status": "Completed", "time_range": "2023",
            "institution": "Self-directed · GitHub + Online Courses", "title": "Backend Engineering Program",
            "description": "Comprehensive self-study of backend architecture and APIs.",
            "icon": "fa-server", "icon_bg": "bg-gray-600", "display_order": 3
        },
        {
            "type": "oss", "status": "Ongoing", "time_range": "2022 – Present",
            "institution": "GitHub · Various Projects", "title": "Open Source Contributor",
            "description": "Active contributor to various open-source tools and libraries.",
            "icon": "fa-users", "icon_bg": "bg-gray-500", "display_order": 4
        },
        {
            "type": "milestone", "status": "Completed", "time_range": "2021",
            "institution": "Self-taught → CS Degree", "title": "Started Coding",
            "description": "Began self-teaching programming which led to a formal CS degree.",
            "icon": "fa-code", "icon_bg": "bg-gray-300", "display_order": 5
        }
    ]

    try:
        # Clear existing
        db.query(Project).delete()
        db.query(Skill).delete()
        db.query(Experience).delete()
        
        for data in projects_data:
            project = Project(**data)
            db.add(project)
            
        for data in skills_data:
            skill = Skill(**data)
            db.add(skill)
            
        for data in experiences_data:
            experience = Experience(**data)
            db.add(experience)
        
        db.commit()

        # Seed admin user
        db.query(User).delete()
        admin_user = User(
            email="bagusalfiyanyusuf@gmail.com",
            hashed_password=get_password_hash("admin123"),
            is_active=True,
            is_superuser=True
        )
        db.add(admin_user)

        # Seed profile
        db.query(Profile).delete()
        profile = Profile(
            name="Bagus Alfiyan",
            title="CS Student · ML Engineer · Backend Dev",
            bio="Undergraduate CS student who builds end-to-end systems — from ML models to microcontrollers.",
            github_url="https://github.com/Fiyanz",
            email="bagusalfiyanyusuf@gmail.com",
            location="Bandung, Indonesia",
            status="Available for Internship"
        )
        db.add(profile)

        db.commit()
        print("Successfully seeded all data!")
    except Exception as e:
        print(f"Error seeding data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    asyncio.run(seed())
