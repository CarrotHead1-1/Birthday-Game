from sqlalchemy.orm import Session
from models import Character, JigsawPuzzle, Notebook, Documents

def seedCharacter(db: Session):
    if db.query(Character).count() == 0:

        characters = [
            Character(
                name = "Sir Kevin Escott",
                age = "54",
                description = "Multi-millionaire an CEO of KEIB Ltd, the company he " \
                "founded in 1999. Consumer electronics is a fast moving" \
                "business but Sir Kevin has remained at the top of the " \
                "food chain. His public image is that he is ruthless, " \
                "demanding, a micro-manager but in private he is more " \
                "compassionate.",
                image_path = "/static/SirKevin.png"
            ),
            Character(
                name = "Faloozie Escott",
                age = "39?",
                description = "Sir Kevin's second wife. Opinion is divided about her.\n" \
                "Trophey wife? Definitely.\n Gold Digger? Maybe.\n Bimbo? To be determind",
                image_path = "/static/Faloozie.png"
            ),

            Character (
                name = "Mallendra Escott",
                age = "23",
                description = "Sir Kevin Escott's daughter from his first wife Lilly Escott-Rossi. Sister to Kev.Jr. " \
                "Renowned for her equestrian success but even more for partying." \
                "That is until she suddnenly stopped appearing in the clubs months ago.",
                image_path = "/static/Mallendra.png"
            ),
            Character(
                name = "Kev. Jr",
                age = "24",
                description = "Sir Kevin's other child from his first marriage, brother to" \
                "Mallendra. His career in international rugby was cut short by a catastrophic " \
                "shoulder injury at 18. He studied product design, following in his father's" \
                "footsteps, balancing his studies with hardcore partying and womanising. Despite his " \
                "reputed genius with R&D, daddy won't extend a hand of nepotism to him",
                image_path = "/static/KevJr.png"
            ),
            Character(
                name = "Bernardo Rossi",
                age = "48",
                description = "Executive PA to Sir Kevin. Bernardo is brave, fearless" \
                "and has a fiery personality. He does not take being told" \
                "what to do very well. In his youth he was the Stig on Top Gear but" \
                "arguments with Jeremy Clackson got him fired. He is not tempermentally" \
                "suited to a desk job but Sir Kevin gave his former brother in law the job.",
                image_path = "/static/Bernardo.png"
            ),
            Character(
                name = "Seamus Masters",
                age = "45",
                description = "Sir Kevin's Cheif of Staff. His background is in R&D." \
                "Seamus is inscrutable. He shares a passion for fast cars with Bernardo and" \
                "has been heard to boast about his prowess with picking stocks and " \
                "making a killing on the stock markets",
                image_path = "/static/Seamus.png"
            ),
            Character(
                name = "Lollyanna",
                age = "21",
                description = "A waitress frequently hired for Escott parties",
                image_path = "/static/Lollyanna.png"
            ),

        ]
        db.add_all(characters)
        db.commit()


def seedPuzzles(db: Session):
    if db.query(JigsawPuzzle).count() == 0:
        puzzles = [
            JigsawPuzzle (
                name = "notebookPuzzle",
                image_path = "/static/NotebookPuzzle.png"
            )
        ]
        db.add_all(puzzles)
        db.commit()

def seedNotebook(db: Session):
    if db.query(Notebook).count() == 0:
        pages = (
            Notebook(
                info = "page 1",
                page_path = "/static/notebookEntry1.png"
            ),
            Notebook(
                info = "page 2",
                page_path = "/static/notebookEntry2.png"
            ),
            Notebook(
                info = "page 3",
                page_path = "/static/notebookEntry3.png"
            ),
            Notebook(
                info = "page 4",
                page_path = "/static/notebookEntry4.png"
            ),
            Notebook(
                info = "page 5",
                page_path = "/static/notebookEntry5.png"
            ),
            Notebook(
                info = "page 6",
                page_path = "/static/notebookEntryBlank.png"
            ),
            Notebook(
                info = "page 7",
                page_path = "/static/notebookEntry6.png"
            ),
           Notebook(
                info = "page 8",
                page_path = "/static/notebookEntryBlank.png"
            ),
           Notebook(
                info = "page 9",
                page_path = "/static/notebookEntry7.png"
            ),
            Notebook(
                info = "page 10",
                page_path = "/static/notebookEntry8.png"
            )
        )
        db.add_all(pages)
        db.commit()

    def seedDocuments(db: Session):
        if db.query(Documents).count() == 0:
            documents = (
                # Documents(
                # name = "House Blueprint",
                # document_path = "/static/",
                # locked = False
                # ),
                Documents(
                    name = "Flourist Receipt",
                    document_path = "/staic/flouristReceipt.png",
                    locked = True
                ),
                Documents(
                    name = "Doctors Perscription",
                    document_path = "/static/doctorsPescription.png",
                    locked = True
                )
            )
        
        db.add_all(documents)
        db.commit

def seedData(db):
    seedCharacter(db)
    seedPuzzles(db)
    seedNotebook(db)