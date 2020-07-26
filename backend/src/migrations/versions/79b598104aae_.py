"""empty message

Revision ID: 79b598104aae
Revises: 0c91da7fa8bf
Create Date: 2020-07-23 14:06:29.651759

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '79b598104aae'
down_revision = '0c91da7fa8bf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('extrafunds',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('mmk_amount', sa.Float(), nullable=True),
    sa.Column('transfer_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['transfer_id'], ['transfers.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('extrafunds')
    # ### end Alembic commands ###