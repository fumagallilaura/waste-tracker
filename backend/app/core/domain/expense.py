from datetime import datetime, timezone
from typing import Optional

class Expense:
    def __init__(
        self,
        id: str,
        description: str,
        amount: float,
        category_id: Optional[str] = None,
        created_z: Optional[datetime] = None
    ):
        self.id = id
        self.description = description
        self.amount = amount
        self.category_id = category_id
        self.created_z = created_z or datetime.now(timezone.utc)