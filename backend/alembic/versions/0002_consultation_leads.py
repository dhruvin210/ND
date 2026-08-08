"""Support consultation-form leads.

The /solutions consultation form collects name, email, phone, the solution of
interest, and free-text details — it does not ask for company, budget, or
timeline. Those three columns become nullable and `interest` is added.

Revision ID: 0002
Revises: 0001
Create Date: 2026-08-07
"""

import sqlalchemy as sa
from alembic import op

revision = "0002"
down_revision = "0001"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("leads", sa.Column("interest", sa.String(60), nullable=True))

    op.alter_column("leads", "company", existing_type=sa.String(160), nullable=True)
    op.alter_column("leads", "project_details", existing_type=sa.Text, nullable=True)
    op.alter_column("leads", "budget", existing_type=sa.String(40), nullable=True)
    op.alter_column("leads", "timeline", existing_type=sa.String(40), nullable=True)


def downgrade() -> None:
    # Backfill placeholders so the NOT NULL constraints can be restored on rows
    # created by the consultation form.
    op.execute("UPDATE leads SET company = 'Unknown' WHERE company IS NULL")
    op.execute("UPDATE leads SET project_details = '' WHERE project_details IS NULL")
    op.execute("UPDATE leads SET budget = 'Unknown' WHERE budget IS NULL")
    op.execute("UPDATE leads SET timeline = 'Unknown' WHERE timeline IS NULL")

    op.alter_column("leads", "timeline", existing_type=sa.String(40), nullable=False)
    op.alter_column("leads", "budget", existing_type=sa.String(40), nullable=False)
    op.alter_column("leads", "project_details", existing_type=sa.Text, nullable=False)
    op.alter_column("leads", "company", existing_type=sa.String(160), nullable=False)

    op.drop_column("leads", "interest")
