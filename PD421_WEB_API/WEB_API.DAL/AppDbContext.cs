using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WEB_API.DAL.Entities.Category;
using WEB_API.DAL.Entities.Identity;

namespace WEB_API.DAL
{
    public class AppDbContext : IdentityDbContext<
        UserEntity,
        RoleEntity,
        long,
        IdentityUserClaim<long>,
        UserRoleEntity,
        IdentityUserLogin<long>,
        IdentityRoleClaim<long>,
        IdentityUserToken<long>>
    {
        public AppDbContext(DbContextOptions options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<UserRoleEntity>(ur =>
            {
                ur.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(r => r.RoleId)
                    .IsRequired();
                ur.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(u => u.UserId)
                    .IsRequired();
            });
        }

        public DbSet<CategoryEntity> Categories { get; set; }
    }
}
