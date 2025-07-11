from sqlalchemy.orm import Session
from models import Character, JigsawPuzzle, Notebook, Documents, Password

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
                #nothing
            ),
            Notebook(
                info = "page 2",
                page_path = "/static/notebookEntry2.png"
                #looking at bernardo
            ),
            Notebook(
                info = "page 3",
                page_path = "/static/notebookEntry3.png"
                #swears
            ),
            Notebook(
                info = "page 4",
                page_path = "/static/notebookEntry4.png"
                #talks about bugs
            ),
            Notebook(
                info = "page 5",
                page_path = "/static/notebookEntry5.png"
                #first bug
            ),
            Notebook(
                info = "page 6",
                page_path = "/static/notebookEntryBlank.png"
                #blank
            ),
            Notebook(
                info = "page 7",
                page_path = "/static/notebookEntry6.png"
                #penicl rubbing
            ),
           Notebook(
                info = "page 8",
                page_path = "/static/notebookEntryBlank.png"
                #blank
            ),
           Notebook(
                info = "page 9",
                page_path = "/static/notebookEntry7.png"
                #people acting weird
            ),
            Notebook(
                info = "page 10",
                page_path = "/static/notebookEntry8.png"
                #cameras 
            ),
            Notebook(
                info = "page 11",
                page_path = "/static/notebookEntry9.png"
                #caymann transfer
            ),
            Notebook(
                info = "page 12",
                page_path = "/static/notebookEntry10.png"
                #finger print puzzle
            ),
            Notebook(
                info = "page 13",
                page_path = "/static/notebookEntry11.png"
            ),
            Notebook(
                info = "page 14",
                page_path = "/static/notebookEntry12.png"
                #submit answer
            )

        )
        db.add_all(pages)
        db.commit()

def seedDocuments(db: Session):
    if db.query(Documents).count() == 0:
        docs = (
            Documents(
            name = "House Blueprint",
            doc_path = "/static/houseLayout.png",
            locked = False
            ),
            Documents(
                name = "Flourist Receipt",
                doc_path = "/static/flouristReceipt.png",
                locked = True
            ),
            Documents(
                name = "Doctors Perscription",
                doc_path = "/static/doctorsPerscription.png",
                locked = True
            ),
            Documents(
                name = "Secret Notebook Rubbing",
                doc_path = "/static/rubbingEntry.PNG",
                locked = True
            ),
            Documents(
                name = "Interviews",
                doc_path = "/static/interviews/png",
                locked = True
            ),
            Documents(
                name = "Bank Transfer to the Caymanns",
                doc_path = "/static/bankTransfer.png",
                locked = True
            ),
            Documents(
                name = "Lollyannas Caymann trip text",
                doc_path = "/static/caymannText.png",
                locked = True
            )

        )
        db.add_all(docs)
        db.commit()

def seedPasswords(db: Session):
    if db.query(Password).count() == 0:
        passwords = [
            Password(
            name = "spyfilePassword",
            password = "123456"
            )
        ]

    db.add_all(passwords)
    db.commit()

def seedData(db):
    seedCharacter(db)
    seedPuzzles(db)
    seedNotebook(db)
    seedDocuments(db)
    #seedPasswords(db)